-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert emails (public waitlist)
CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to check if email exists
CREATE POLICY "Anyone can check emails"
  ON public.waitlist
  FOR SELECT
  USING (true);

-- Create visitor counter table
CREATE TABLE IF NOT EXISTS public.visitor_count (
  id INTEGER PRIMARY KEY DEFAULT 1,
  count INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Enable RLS
ALTER TABLE public.visitor_count ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the count
CREATE POLICY "Anyone can read visitor count"
  ON public.visitor_count
  FOR SELECT
  USING (true);

-- Allow anyone to increment the count
CREATE POLICY "Anyone can increment count"
  ON public.visitor_count
  FOR UPDATE
  USING (true);

-- Initialize the counter
INSERT INTO public.visitor_count (id, count)
VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;