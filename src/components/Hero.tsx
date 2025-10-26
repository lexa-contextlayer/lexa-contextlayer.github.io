import { useState } from "react";
import lexaLogo from "@/assets/lexa-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { z } from "zod";

const emailSchema = z.string()
  .trim()
  .email({ message: "Invalid email address" })
  .max(255, { message: "Email must be less than 255 characters" });

interface HeroProps {
  onJoinWaitlist: () => void;
}

const Hero = ({ onJoinWaitlist }: HeroProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);

  const handleJoinWaitlist = async () => {
    if (!email.trim()) {
      onJoinWaitlist();
      return;
    }

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
      const { error } = await supabase
        .from("waitlist")
        .insert({ email });

      if (error) {
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
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="flex justify-center mb-8 animate-float">
          <img 
            src={lexaLogo} 
            alt="Lexa Owl Logo" 
            className="w-32 h-32 object-contain"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            Stay in flow. Always.
          </h1>
          
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            The Context Layer for Everyday AI Tools.
          </p>
        </div>

        {/* Launch Video */}
        <div className="w-full max-w-3xl mx-auto">
          <video
            className="w-full rounded-2xl shadow-lg"
            controls
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/lexa-launch.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Email Input and Button */}
        <div className="pt-4 space-y-4">
          <div className="max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base"
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleJoinWaitlist();
                }
              }}
            />
          </div>
          <Button
            onClick={handleJoinWaitlist}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-medium transition-smooth hover:shadow-lg hover:scale-105"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join the Waitlist"}
          </Button>
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

export default Hero;