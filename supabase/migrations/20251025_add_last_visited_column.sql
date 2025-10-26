-- Add last_visited column to visitor_count table
ALTER TABLE public.visitor_count 
ADD COLUMN last_visited TIMESTAMPTZ DEFAULT now();

-- Update the increment function to also update last_visited
CREATE OR REPLACE FUNCTION increment_visitor_count()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE visitor_count 
  SET count = count + 1,
      last_visited = now()
  WHERE id = 1
  RETURNING count INTO new_count;
  
  RETURN new_count;
END;
$$;