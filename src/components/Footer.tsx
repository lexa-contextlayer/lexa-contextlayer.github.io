import { Twitter, Instagram, Mail } from "lucide-react";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://x.com/Lexa_Context_AI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Follow us on X"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/lexa.contextlayer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.tiktok.com/@lexa8270"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Follow us on TikTok"
            >
              <TikTokIcon />
            </a>
            <a
              href="mailto:lexa.contextlayer@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Contact us"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          
          {/* Made by */}
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by{" "}
            <a
              href="https://x.com/MaxMill06"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline"
            >
              Sachin
            </a>
            {" "}and{" "}
            <a
              href="https://www.linkedin.com/in/saitigerraina/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline"
            >
              Sai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;