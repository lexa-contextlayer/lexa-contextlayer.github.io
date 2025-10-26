-- Create atomic increment function for visitor counter
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
  SET count = count + 1 
  WHERE id = 1
  RETURNING count INTO new_count;
  
  RETURN new_count;
END;
$$;