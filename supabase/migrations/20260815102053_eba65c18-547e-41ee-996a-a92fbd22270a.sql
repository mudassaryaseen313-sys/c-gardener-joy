-- The has_role security definer helper triggers linter warnings and is not currently
-- used by any policy. Policies use direct user_id checks and simple subqueries
-- against user_roles, which avoids recursion because user_roles RLS is a simple
-- equality check on user_id.
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
