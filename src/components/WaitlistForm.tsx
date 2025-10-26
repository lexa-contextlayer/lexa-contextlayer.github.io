import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const emailSchema = z.string()
  .trim()
  .email({ message: "Invalid email address" })
  .max(255, { message: "Email must be less than 255 characters" });

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email with zod
    try {
      emailSchema.parse(email);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
        return;
      }
    }

    setLoading(true);

    try {
      // Insert new email - database unique constraint will prevent duplicates
      const { error } = await supabase
        .from("waitlist")
        .insert({ email });

      if (error) {
        // Handle duplicate email (Postgres unique violation)
        if (error.code === '23505') {
          setIsExistingUser(true);
          setShowSuccessDialog(true);
          setEmail("");
          return;
        }
        throw error;
      }

      setIsExistingUser(false);
      setShowSuccessDialog(true);
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-2xl p-12 shadow-medium border border-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Join the Waitlist</h2>
            <p className="text-muted-foreground">
              Be the first to know when Lexa launches.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base"
              disabled={loading}
            />
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth hover:scale-105"
              disabled={loading}
            >
              {loading ? "Joining..." : "Join the Waitlist"}
            </Button>
          </form>
        </div>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-card rounded-2xl shadow-lg border border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold">
              {isExistingUser ? "You're already on the list! 👋" : "Thanks for joining the waitlist! 💫"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base space-y-3 text-muted-foreground">
              {isExistingUser ? (
                <>
                  <p>We'll be in touch soon.</p>
                  <p>
                    Got ideas or feedback? We'd love to hear from you at{" "}
                    <a 
                      href="mailto:lexa.contextlayer@gmail.com" 
                      className="text-primary hover:underline"
                    >
                      lexa.contextlayer@gmail.com
                    </a>
                  </p>
                </>
              ) : (
                <>
                  <p>Stay tuned — we'll be sharing updates and sneak peeks as Lexa comes together.</p>
                  <p>
                    Got ideas or feedback? We'd love to hear from you at{" "}
                    <a 
                      href="mailto:lexa.contextlayer@gmail.com" 
                      className="text-primary hover:underline"
                    >
                      lexa.contextlayer@gmail.com
                    </a>
                  </p>
                  <p>
                    Follow our progress on{" "}
                    <a 
                      href="https://x.com/Lexa_Context_AI" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      X
                    </a>
                  </p>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Button 
            onClick={() => setShowSuccessDialog(false)} 
            className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Close
          </Button>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default WaitlistForm;