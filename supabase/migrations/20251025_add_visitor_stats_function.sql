-- Create function to get visitor statistics
CREATE OR REPLACE FUNCTION get_visitor_stats()
RETURNS TABLE(count integer, last_visited timestamptz)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT v.count, v.last_visited
  FROM visitor_count v
  WHERE v.id = 1;
END;
$$;