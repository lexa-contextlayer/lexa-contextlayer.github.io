import { supabase } from "@/integrations/supabase/client";

// Get visitor statistics
export const getVisitorStats = async () => {
  const { data, error } = await supabase.rpc('get_visitor_stats');
  if (error) throw error;
  return data[0]; // Returns { count: number, last_visited: string }
};

// Get all waitlist entries (admin function)
export const getWaitlistEntries = async () => {
  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Get waitlist count
export const getWaitlistCount = async () => {
  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });
  
  if (error) throw error;
  return count;
};

// Increment visitor count (existing function)
export const incrementVisitorCount = async () => {
  const { data, error } = await supabase.rpc('increment_visitor_count');
  if (error) throw error;
  return data;
};