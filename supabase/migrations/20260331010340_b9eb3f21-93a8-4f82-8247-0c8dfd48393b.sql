
-- =============================================
-- NEVIX BACKEND: FULL SCHEMA MIGRATION
-- =============================================

-- 1. ENUMS
CREATE TYPE public.workspace_role AS ENUM ('owner', 'admin', 'member');
CREATE TYPE public.agent_status AS ENUM ('active', 'inactive', 'paused');
CREATE TYPE public.conversation_status AS ENUM ('open', 'waiting', 'closed', 'archived');
CREATE TYPE public.sender_type AS ENUM ('contact', 'agent', 'system', 'ai');
CREATE TYPE public.integration_status AS ENUM ('active', 'inactive', 'error');
CREATE TYPE public.channel_type AS ENUM ('whatsapp', 'email', 'webchat', 'telegram', 'instagram');

-- 2. PROFILES TABLE
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. WORKSPACES TABLE
CREATE TABLE public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;

-- 4. WORKSPACE MEMBERS TABLE
CREATE TABLE public.workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role workspace_role NOT NULL DEFAULT 'member',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, user_id)
);
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

-- 5. AGENTS TABLE
CREATE TABLE public.agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  status agent_status NOT NULL DEFAULT 'active',
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

-- 6. CONTACTS TABLE
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 7. CONVERSATIONS TABLE
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE NOT NULL,
  channel channel_type NOT NULL DEFAULT 'whatsapp',
  status conversation_status NOT NULL DEFAULT 'open',
  assigned_agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- 8. MESSAGES TABLE
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_type sender_type NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 9. INTEGRATIONS TABLE
CREATE TABLE public.integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  status integration_status NOT NULL DEFAULT 'inactive',
  config JSONB DEFAULT '{}',
  secret_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;

-- 10. AUDIT LOGS TABLE
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- =============================================
-- SECURITY DEFINER FUNCTIONS (avoid RLS recursion)
-- =============================================

-- Check if user is member of a workspace
CREATE OR REPLACE FUNCTION public.is_workspace_member(_user_id UUID, _workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE user_id = _user_id AND workspace_id = _workspace_id
  );
$$;

-- Check if user has specific role in workspace
CREATE OR REPLACE FUNCTION public.has_workspace_role(_user_id UUID, _workspace_id UUID, _role workspace_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE user_id = _user_id AND workspace_id = _workspace_id AND role = _role
  );
$$;

-- Check if user is owner or admin
CREATE OR REPLACE FUNCTION public.is_workspace_admin_or_owner(_user_id UUID, _workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE user_id = _user_id AND workspace_id = _workspace_id AND role IN ('owner', 'admin')
  );
$$;

-- Get user's workspaces
CREATE OR REPLACE FUNCTION public.get_user_workspace_ids(_user_id UUID)
RETURNS SETOF UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT workspace_id FROM public.workspace_members WHERE user_id = _user_id;
$$;

-- =============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- =============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- AUTO-UPDATE updated_at TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON public.workspaces FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON public.agents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON public.conversations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON public.integrations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- =============================================
-- RLS POLICIES
-- =============================================

-- PROFILES
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- WORKSPACES
CREATE POLICY "Members can view their workspaces" ON public.workspaces FOR SELECT TO authenticated
  USING (id IN (SELECT public.get_user_workspace_ids(auth.uid())));
CREATE POLICY "Authenticated users can create workspaces" ON public.workspaces FOR INSERT TO authenticated
  WITH CHECK (owner_user_id = auth.uid());
CREATE POLICY "Owners can update workspace" ON public.workspaces FOR UPDATE TO authenticated
  USING (public.is_workspace_admin_or_owner(auth.uid(), id));
CREATE POLICY "Owners can delete workspace" ON public.workspaces FOR DELETE TO authenticated
  USING (public.has_workspace_role(auth.uid(), id, 'owner'));

-- WORKSPACE MEMBERS
CREATE POLICY "Members can view workspace members" ON public.workspace_members FOR SELECT TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Admins can add members" ON public.workspace_members FOR INSERT TO authenticated
  WITH CHECK (public.is_workspace_admin_or_owner(auth.uid(), workspace_id) OR user_id = auth.uid());
CREATE POLICY "Admins can update members" ON public.workspace_members FOR UPDATE TO authenticated
  USING (public.is_workspace_admin_or_owner(auth.uid(), workspace_id));
CREATE POLICY "Admins can remove members" ON public.workspace_members FOR DELETE TO authenticated
  USING (public.is_workspace_admin_or_owner(auth.uid(), workspace_id) OR user_id = auth.uid());

-- MACRO for workspace-scoped tables
-- AGENTS
CREATE POLICY "Members can view agents" ON public.agents FOR SELECT TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Admins can create agents" ON public.agents FOR INSERT TO authenticated
  WITH CHECK (public.is_workspace_admin_or_owner(auth.uid(), workspace_id));
CREATE POLICY "Admins can update agents" ON public.agents FOR UPDATE TO authenticated
  USING (public.is_workspace_admin_or_owner(auth.uid(), workspace_id));
CREATE POLICY "Admins can delete agents" ON public.agents FOR DELETE TO authenticated
  USING (public.is_workspace_admin_or_owner(auth.uid(), workspace_id));

-- CONTACTS
CREATE POLICY "Members can view contacts" ON public.contacts FOR SELECT TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Members can create contacts" ON public.contacts FOR INSERT TO authenticated
  WITH CHECK (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Members can update contacts" ON public.contacts FOR UPDATE TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Admins can delete contacts" ON public.contacts FOR DELETE TO authenticated
  USING (public.is_workspace_admin_or_owner(auth.uid(), workspace_id));

-- CONVERSATIONS
CREATE POLICY "Members can view conversations" ON public.conversations FOR SELECT TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Members can create conversations" ON public.conversations FOR INSERT TO authenticated
  WITH CHECK (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Members can update conversations" ON public.conversations FOR UPDATE TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Admins can delete conversations" ON public.conversations FOR DELETE TO authenticated
  USING (public.is_workspace_admin_or_owner(auth.uid(), workspace_id));

-- MESSAGES
CREATE POLICY "Members can view messages" ON public.messages FOR SELECT TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Members can send messages" ON public.messages FOR INSERT TO authenticated
  WITH CHECK (public.is_workspace_member(auth.uid(), workspace_id));

-- INTEGRATIONS
CREATE POLICY "Members can view integrations" ON public.integrations FOR SELECT TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Admins can manage integrations" ON public.integrations FOR INSERT TO authenticated
  WITH CHECK (public.is_workspace_admin_or_owner(auth.uid(), workspace_id));
CREATE POLICY "Admins can update integrations" ON public.integrations FOR UPDATE TO authenticated
  USING (public.is_workspace_admin_or_owner(auth.uid(), workspace_id));
CREATE POLICY "Admins can delete integrations" ON public.integrations FOR DELETE TO authenticated
  USING (public.is_workspace_admin_or_owner(auth.uid(), workspace_id));

-- AUDIT LOGS (read-only for members, insert by system/functions)
CREATE POLICY "Members can view audit logs" ON public.audit_logs FOR SELECT TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Members can create audit logs" ON public.audit_logs FOR INSERT TO authenticated
  WITH CHECK (public.is_workspace_member(auth.uid(), workspace_id));

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX idx_workspace_members_user_id ON public.workspace_members(user_id);
CREATE INDEX idx_workspace_members_workspace_id ON public.workspace_members(workspace_id);
CREATE INDEX idx_contacts_workspace_id ON public.contacts(workspace_id);
CREATE INDEX idx_conversations_workspace_id ON public.conversations(workspace_id);
CREATE INDEX idx_conversations_contact_id ON public.conversations(contact_id);
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_messages_workspace_id ON public.messages(workspace_id);
CREATE INDEX idx_agents_workspace_id ON public.agents(workspace_id);
CREATE INDEX idx_integrations_workspace_id ON public.integrations(workspace_id);
CREATE INDEX idx_audit_logs_workspace_id ON public.audit_logs(workspace_id);
CREATE INDEX idx_audit_logs_actor ON public.audit_logs(actor_user_id);
