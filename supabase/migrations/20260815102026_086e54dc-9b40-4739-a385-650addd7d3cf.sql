-- The has_role helper is intentionally SECURITY DEFINER so RLS policies can
-- check user_roles without triggering recursive RLS. It is only needed by
-- authenticated policies, so revoke public/anon execute and keep authenticated.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
