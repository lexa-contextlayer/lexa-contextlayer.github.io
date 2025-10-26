-- Remove the overly permissive SELECT policy that exposes all emails
DROP POLICY IF EXISTS "Anyone can check emails" ON public.waitlist;

-- Add unique constraint on email to prevent duplicates at database level
ALTER TABLE public.waitlist ADD CONSTRAINT waitlist_email_unique UNIQUE (email);