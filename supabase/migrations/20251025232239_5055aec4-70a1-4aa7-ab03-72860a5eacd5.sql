-- Remove the permissive UPDATE policy that allows direct manipulation
DROP POLICY IF EXISTS "Anyone can increment count" ON public.visitor_count;

-- The visitor count should only be incremented via the secure RPC function
-- No direct UPDATE access is needed since we have increment_visitor_count() function