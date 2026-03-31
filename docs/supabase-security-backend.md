# Nevix Supabase Security Blueprint

Este documento descreve como operar o backend do Nevix com Supabase de forma segura em producao.

## 1) Arquitetura recomendada

- Frontend usa apenas `SUPABASE_URL` + `SUPABASE_ANON_KEY`.
- Backend usa `SUPABASE_SERVICE_ROLE_KEY` somente no servidor (API privada).
- Toda decisao de autorizacao cruza `auth.uid()` com `workspace_members`.
- Segregacao por tenant com `workspace_id` em todas as tabelas de dominio.
- RLS habilitado em todas as tabelas do schema `public`.

## 2) Fluxo seguro de autenticacao/autorizacao

- O usuario autentica via Supabase Auth.
- O frontend envia JWT do usuario para seu backend.
- O backend valida a sessao/JWT e opera com:
  - cliente com JWT do usuario para operacoes comuns (respeita RLS automaticamente), ou
  - cliente `service_role` para operacoes administrativas controladas.
- O backend nunca confia em `workspace_id` vindo do cliente sem validar membership.

## 3) Segredos de integracoes

- Nao guardar segredo em texto puro em `public.integrations`.
- Usar `secret_ref` para referenciar segredo em cofre (ex.: Vault/KMS).
- Somente backend com `service_role` pode setar/rotacionar segredo.
- Frontend nao recebe segredo em resposta.

## 4) Operacoes administrativas (area separada)

- Funcoes administrativas ficam no schema `backend`.
- Sem `grant` para `anon`/`authenticated`.
- Verificacao obrigatoria de role de servico (`service_role`) dentro da funcao.

## 5) Queries seguras (exemplos)

## Frontend (anon key + JWT do usuario)

```ts
// Exemplo: listar conversas do workspace atual
const { data, error } = await supabase
  .from("conversations")
  .select("id, status, last_message_at, contact_id")
  .eq("workspace_id", workspaceId)
  .order("last_message_at", { ascending: false });
// RLS garante que apenas membros ativos do workspace vejam dados.
```

```ts
// Exemplo: criar contato
const { error } = await supabase
  .from("contacts")
  .insert({
    workspace_id: workspaceId,
    full_name: "Maria Silva",
    phone_e164: "+5511999999999",
    created_by: userId,
    updated_by: userId,
  });
// RLS valida membership + ownership fields.
```

## Backend (service role - operacao sensivel)

```ts
// Exemplo: setar referencia de segredo para integracao
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const { error } = await admin.rpc("set_integration_secret_ref", {
  p_integration_id: integrationId,
  p_workspace_id: workspaceId,
  p_secret_ref: vaultSecretId,
  p_actor_user_id: actorUserId,
});
if (error) throw error;
```

## Backend (query com checagem defensiva adicional)

```ts
// Mesmo com RLS, valide membership no backend para regras de negocio criticas.
const { data: member } = await admin
  .from("workspace_members")
  .select("role, status")
  .eq("workspace_id", workspaceId)
  .eq("user_id", userId)
  .single();

if (!member || member.status !== "active") throw new Error("forbidden");
```

## 6) Checklist critico de seguranca

- Nao logar chaves, tokens ou payloads sensiveis.
- Nao enviar `service_role` para browser/app mobile.
- Definir rotacao de segredos (ex.: 60/90 dias).
- Auditar operacoes sensiveis: segredo, membros, permissoes, exclusoes.
- Limitar superficie do frontend (colunas minimas no `select`).
- Revisar RLS a cada tabela nova (regra: sem tabela publica sem RLS).

## 7) Deploy e governanca

- Versionar apenas migrations SQL revisadas.
- Rodar migration primeiro em staging.
- Executar testes de autorizacao por perfil:
  - usuario sem membership nao acessa tenant alheio,
  - member acessa apenas seu workspace,
  - admin/owner executam operacoes elevadas.

