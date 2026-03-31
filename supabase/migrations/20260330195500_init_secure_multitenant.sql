-- Secure multi-tenant baseline for Nevix (Supabase/Postgres)
-- Goals:
-- - Workspace-based tenant isolation
-- - Strict RLS on every public table
-- - Service role only for privileged/admin operations
-- - Secrets never returned in plaintext

begin;

create extension if not exists pgcrypto;

create schema if not exists app;
create schema if not exists backend;

-- -----------------------------------------------------------------------------
-- Helper functions
-- -----------------------------------------------------------------------------

create or replace function app.current_user_id()
returns uuid
language sql
stable
as $$
  select auth.uid();
$$;

create or replace function app.is_service_role()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() ->> 'role') = 'service_role', false);
$$;

create or replace function app.is_workspace_member(
  p_workspace_id uuid,
  p_allowed_roles text[] default array['owner','admin','member']
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = p_workspace_id
      and wm.user_id = auth.uid()
      and wm.role = any(p_allowed_roles)
      and wm.status = 'active'
  );
$$;

create or replace function app.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function app.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- Core data model
-- -----------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,80}$'),
  owner_user_id uuid not null references public.profiles(id) on delete restrict,
  created_by uuid not null references public.profiles(id) on delete restrict,
  updated_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('owner','admin','member')),
  status text not null default 'active' check (status in ('active','invited','suspended')),
  invited_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 120),
  persona text,
  is_active boolean not null default true,
  settings jsonb not null default '{}'::jsonb,
  created_by uuid not null references public.profiles(id) on delete restrict,
  updated_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, workspace_id)
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  external_id text,
  phone_e164 text,
  full_name text,
  email text,
  tags text[] not null default '{}',
  custom_fields jsonb not null default '{}'::jsonb,
  created_by uuid not null references public.profiles(id) on delete restrict,
  updated_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, external_id),
  unique (workspace_id, phone_e164),
  unique (id, workspace_id)
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  contact_id uuid not null,
  assigned_agent_id uuid,
  status text not null default 'open' check (status in ('open','pending','closed','archived')),
  channel text not null default 'whatsapp' check (channel in ('whatsapp','instagram','web','email')),
  last_message_at timestamptz,
  created_by uuid not null references public.profiles(id) on delete restrict,
  updated_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, workspace_id),
  constraint fk_conversations_contact_workspace
    foreign key (contact_id, workspace_id)
    references public.contacts(id, workspace_id)
    on delete cascade,
  constraint fk_conversations_agent_workspace
    foreign key (assigned_agent_id, workspace_id)
    references public.agents(id, workspace_id)
    on delete set null
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  conversation_id uuid not null,
  sender_type text not null check (sender_type in ('system','agent','customer')),
  sender_agent_id uuid,
  content text not null default '',
  content_type text not null default 'text' check (content_type in ('text','image','audio','file','template','event')),
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (id, workspace_id),
  constraint fk_messages_conversation_workspace
    foreign key (conversation_id, workspace_id)
    references public.conversations(id, workspace_id)
    on delete cascade,
  constraint fk_messages_agent_workspace
    foreign key (sender_agent_id, workspace_id)
    references public.agents(id, workspace_id)
    on delete set null
);

create table if not exists public.integrations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  provider text not null check (char_length(provider) between 2 and 80),
  status text not null default 'inactive' check (status in ('inactive','active','error')),
  -- secret_ref points to an external secret manager entry (e.g., Supabase Vault id)
  secret_ref uuid,
  metadata jsonb not null default '{}'::jsonb,
  last_sync_at timestamptz,
  created_by uuid not null references public.profiles(id) on delete restrict,
  updated_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, provider),
  unique (id, workspace_id)
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  actor_user_id uuid references public.profiles(id) on delete set null,
  action text not null check (char_length(action) between 3 and 120),
  resource_type text not null check (char_length(resource_type) between 2 and 80),
  resource_id uuid,
  ip inet,
  user_agent text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Indexes
-- -----------------------------------------------------------------------------

create index if not exists idx_workspace_members_workspace_user
  on public.workspace_members(workspace_id, user_id);
create index if not exists idx_workspace_members_user
  on public.workspace_members(user_id);

create index if not exists idx_agents_workspace
  on public.agents(workspace_id);
create index if not exists idx_contacts_workspace
  on public.contacts(workspace_id);
create index if not exists idx_contacts_workspace_phone
  on public.contacts(workspace_id, phone_e164);
create index if not exists idx_conversations_workspace
  on public.conversations(workspace_id);
create index if not exists idx_conversations_contact
  on public.conversations(contact_id);
create index if not exists idx_conversations_last_message
  on public.conversations(workspace_id, last_message_at desc nulls last);
create index if not exists idx_messages_workspace_conversation_created
  on public.messages(workspace_id, conversation_id, created_at desc);
create index if not exists idx_integrations_workspace
  on public.integrations(workspace_id);
create index if not exists idx_audit_logs_workspace_created
  on public.audit_logs(workspace_id, created_at desc);
create index if not exists idx_audit_logs_actor
  on public.audit_logs(actor_user_id, created_at desc);

-- -----------------------------------------------------------------------------
-- Triggers
-- -----------------------------------------------------------------------------

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure app.set_updated_at();

drop trigger if exists trg_workspaces_updated_at on public.workspaces;
create trigger trg_workspaces_updated_at
before update on public.workspaces
for each row execute procedure app.set_updated_at();

drop trigger if exists trg_workspace_members_updated_at on public.workspace_members;
create trigger trg_workspace_members_updated_at
before update on public.workspace_members
for each row execute procedure app.set_updated_at();

drop trigger if exists trg_agents_updated_at on public.agents;
create trigger trg_agents_updated_at
before update on public.agents
for each row execute procedure app.set_updated_at();

drop trigger if exists trg_contacts_updated_at on public.contacts;
create trigger trg_contacts_updated_at
before update on public.contacts
for each row execute procedure app.set_updated_at();

drop trigger if exists trg_conversations_updated_at on public.conversations;
create trigger trg_conversations_updated_at
before update on public.conversations
for each row execute procedure app.set_updated_at();

drop trigger if exists trg_integrations_updated_at on public.integrations;
create trigger trg_integrations_updated_at
before update on public.integrations
for each row execute procedure app.set_updated_at();

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute procedure app.handle_new_user_profile();

-- -----------------------------------------------------------------------------
-- RLS + Policies (explicit CRUD for every table)
-- -----------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.agents enable row level security;
alter table public.contacts enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.integrations enable row level security;
alter table public.audit_logs enable row level security;

-- profiles
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
on public.profiles for select
using (id = auth.uid());

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own
on public.profiles for insert
with check (id = auth.uid());

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists profiles_delete_own on public.profiles;
create policy profiles_delete_own
on public.profiles for delete
using (id = auth.uid());

-- workspaces
drop policy if exists workspaces_select_member on public.workspaces;
create policy workspaces_select_member
on public.workspaces for select
using (app.is_workspace_member(id));

drop policy if exists workspaces_insert_owner_only on public.workspaces;
create policy workspaces_insert_owner_only
on public.workspaces for insert
with check (
  owner_user_id = auth.uid()
  and created_by = auth.uid()
  and updated_by = auth.uid()
);

drop policy if exists workspaces_update_owner_admin on public.workspaces;
create policy workspaces_update_owner_admin
on public.workspaces for update
using (app.is_workspace_member(id, array['owner','admin']))
with check (app.is_workspace_member(id, array['owner','admin']));

drop policy if exists workspaces_delete_owner_only on public.workspaces;
create policy workspaces_delete_owner_only
on public.workspaces for delete
using (app.is_workspace_member(id, array['owner']));

-- workspace_members
drop policy if exists workspace_members_select_member on public.workspace_members;
create policy workspace_members_select_member
on public.workspace_members for select
using (app.is_workspace_member(workspace_id));

drop policy if exists workspace_members_insert_owner_admin on public.workspace_members;
create policy workspace_members_insert_owner_admin
on public.workspace_members for insert
with check (
  app.is_workspace_member(workspace_id, array['owner','admin'])
);

drop policy if exists workspace_members_update_owner_admin on public.workspace_members;
create policy workspace_members_update_owner_admin
on public.workspace_members for update
using (app.is_workspace_member(workspace_id, array['owner','admin']))
with check (app.is_workspace_member(workspace_id, array['owner','admin']));

drop policy if exists workspace_members_delete_owner_admin on public.workspace_members;
create policy workspace_members_delete_owner_admin
on public.workspace_members for delete
using (app.is_workspace_member(workspace_id, array['owner','admin']));

-- agents
drop policy if exists agents_select_member on public.agents;
create policy agents_select_member
on public.agents for select
using (app.is_workspace_member(workspace_id));

drop policy if exists agents_insert_member on public.agents;
create policy agents_insert_member
on public.agents for insert
with check (
  app.is_workspace_member(workspace_id)
  and created_by = auth.uid()
  and updated_by = auth.uid()
);

drop policy if exists agents_update_member on public.agents;
create policy agents_update_member
on public.agents for update
using (app.is_workspace_member(workspace_id))
with check (app.is_workspace_member(workspace_id));

drop policy if exists agents_delete_owner_admin on public.agents;
create policy agents_delete_owner_admin
on public.agents for delete
using (app.is_workspace_member(workspace_id, array['owner','admin']));

-- contacts
drop policy if exists contacts_select_member on public.contacts;
create policy contacts_select_member
on public.contacts for select
using (app.is_workspace_member(workspace_id));

drop policy if exists contacts_insert_member on public.contacts;
create policy contacts_insert_member
on public.contacts for insert
with check (
  app.is_workspace_member(workspace_id)
  and created_by = auth.uid()
  and updated_by = auth.uid()
);

drop policy if exists contacts_update_member on public.contacts;
create policy contacts_update_member
on public.contacts for update
using (app.is_workspace_member(workspace_id))
with check (app.is_workspace_member(workspace_id));

drop policy if exists contacts_delete_owner_admin on public.contacts;
create policy contacts_delete_owner_admin
on public.contacts for delete
using (app.is_workspace_member(workspace_id, array['owner','admin']));

-- conversations
drop policy if exists conversations_select_member on public.conversations;
create policy conversations_select_member
on public.conversations for select
using (app.is_workspace_member(workspace_id));

drop policy if exists conversations_insert_member on public.conversations;
create policy conversations_insert_member
on public.conversations for insert
with check (
  app.is_workspace_member(workspace_id)
  and created_by = auth.uid()
  and updated_by = auth.uid()
);

drop policy if exists conversations_update_member on public.conversations;
create policy conversations_update_member
on public.conversations for update
using (app.is_workspace_member(workspace_id))
with check (app.is_workspace_member(workspace_id));

drop policy if exists conversations_delete_owner_admin on public.conversations;
create policy conversations_delete_owner_admin
on public.conversations for delete
using (app.is_workspace_member(workspace_id, array['owner','admin']));

-- messages
drop policy if exists messages_select_member on public.messages;
create policy messages_select_member
on public.messages for select
using (app.is_workspace_member(workspace_id));

drop policy if exists messages_insert_member on public.messages;
create policy messages_insert_member
on public.messages for insert
with check (app.is_workspace_member(workspace_id));

drop policy if exists messages_update_owner_admin on public.messages;
create policy messages_update_owner_admin
on public.messages for update
using (app.is_workspace_member(workspace_id, array['owner','admin']))
with check (app.is_workspace_member(workspace_id, array['owner','admin']));

drop policy if exists messages_delete_owner_admin on public.messages;
create policy messages_delete_owner_admin
on public.messages for delete
using (app.is_workspace_member(workspace_id, array['owner','admin']));

-- integrations
drop policy if exists integrations_select_member on public.integrations;
create policy integrations_select_member
on public.integrations for select
using (app.is_workspace_member(workspace_id));

drop policy if exists integrations_insert_owner_admin on public.integrations;
create policy integrations_insert_owner_admin
on public.integrations for insert
with check (
  app.is_workspace_member(workspace_id, array['owner','admin'])
  and created_by = auth.uid()
  and updated_by = auth.uid()
);

drop policy if exists integrations_update_owner_admin on public.integrations;
create policy integrations_update_owner_admin
on public.integrations for update
using (app.is_workspace_member(workspace_id, array['owner','admin']))
with check (app.is_workspace_member(workspace_id, array['owner','admin']));

drop policy if exists integrations_delete_owner_only on public.integrations;
create policy integrations_delete_owner_only
on public.integrations for delete
using (app.is_workspace_member(workspace_id, array['owner']));

-- audit_logs
drop policy if exists audit_logs_select_member on public.audit_logs;
create policy audit_logs_select_member
on public.audit_logs for select
using (app.is_workspace_member(workspace_id, array['owner','admin']));

drop policy if exists audit_logs_insert_member on public.audit_logs;
create policy audit_logs_insert_member
on public.audit_logs for insert
with check (
  app.is_workspace_member(workspace_id)
  and (actor_user_id = auth.uid() or actor_user_id is null)
);

drop policy if exists audit_logs_update_none on public.audit_logs;
create policy audit_logs_update_none
on public.audit_logs for update
using (false)
with check (false);

drop policy if exists audit_logs_delete_owner_only on public.audit_logs;
create policy audit_logs_delete_owner_only
on public.audit_logs for delete
using (app.is_workspace_member(workspace_id, array['owner']));

-- -----------------------------------------------------------------------------
-- Privilege hardening
-- -----------------------------------------------------------------------------

revoke all on all tables in schema public from anon;
revoke all on all tables in schema public from authenticated;

grant usage on schema public to authenticated;
grant usage on schema app to authenticated;

-- regular app tables exposed to authenticated + RLS
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.workspaces to authenticated;
grant select, insert, update, delete on public.workspace_members to authenticated;
grant select, insert, update, delete on public.agents to authenticated;
grant select, insert, update, delete on public.contacts to authenticated;
grant select, insert, update, delete on public.conversations to authenticated;
grant select, insert, update, delete on public.messages to authenticated;
grant select, insert, update, delete on public.audit_logs to authenticated;

-- integrations: no secret/plaintext access from frontend
grant select (id, workspace_id, provider, status, metadata, last_sync_at, created_by, updated_by, created_at, updated_at)
  on public.integrations to authenticated;
grant insert (workspace_id, provider, status, metadata, created_by, updated_by)
  on public.integrations to authenticated;
grant update (provider, status, metadata, last_sync_at, updated_by)
  on public.integrations to authenticated;

-- backend schema should not be exposed to frontend roles
revoke all on schema backend from public;
revoke all on schema backend from anon;
revoke all on schema backend from authenticated;

-- -----------------------------------------------------------------------------
-- Backend-only admin functions (service_role)
-- -----------------------------------------------------------------------------

create or replace function backend.assert_service_role()
returns void
language plpgsql
as $$
begin
  if not app.is_service_role() then
    raise exception 'forbidden: service_role only';
  end if;
end;
$$;

create or replace function backend.write_audit_log(
  p_workspace_id uuid,
  p_actor_user_id uuid,
  p_action text,
  p_resource_type text,
  p_resource_id uuid,
  p_details jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform backend.assert_service_role();

  insert into public.audit_logs (
    workspace_id,
    actor_user_id,
    action,
    resource_type,
    resource_id,
    details
  ) values (
    p_workspace_id,
    p_actor_user_id,
    p_action,
    p_resource_type,
    p_resource_id,
    coalesce(p_details, '{}'::jsonb)
  );
end;
$$;

create or replace function backend.set_integration_secret_ref(
  p_integration_id uuid,
  p_workspace_id uuid,
  p_secret_ref uuid,
  p_actor_user_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform backend.assert_service_role();

  update public.integrations i
  set secret_ref = p_secret_ref,
      updated_by = p_actor_user_id,
      updated_at = now()
  where i.id = p_integration_id
    and i.workspace_id = p_workspace_id;

  perform backend.write_audit_log(
    p_workspace_id,
    p_actor_user_id,
    'integration.secret_ref.updated',
    'integration',
    p_integration_id,
    jsonb_build_object('provider', (select provider from public.integrations where id = p_integration_id))
  );
end;
$$;

revoke all on function backend.assert_service_role() from public, anon, authenticated;
revoke all on function backend.write_audit_log(uuid, uuid, text, text, uuid, jsonb) from public, anon, authenticated;
revoke all on function backend.set_integration_secret_ref(uuid, uuid, uuid, uuid) from public, anon, authenticated;

commit;

