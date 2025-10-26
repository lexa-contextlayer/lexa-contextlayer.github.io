import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye } from "lucide-react";

const VisitorCounter = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Use atomic increment function to prevent race conditions
        const { data, error } = await supabase.rpc('increment_visitor_count');

        if (error) throw error;
        
        if (data) {
          setCount(data);
        }
      } catch (error) {
        // Silently fail - visitor tracking is not critical
      }
    };

    trackVisitor();
  }, []);

  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-card border border-border rounded-full px-4 py-2 shadow-medium flex items-center gap-2">
      <Eye className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm font-medium">{count.toLocaleString()} visitors</span>
    </div>
  );
};

export default VisitorCounter;