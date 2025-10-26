import { useRef } from "react";
import Hero from "@/components/Hero";
import WhatIsLexa from "@/components/WhatIsLexa";
import WhyLexa from "@/components/WhyLexa";
import WaitlistForm from "@/components/WaitlistForm";
import VisitorCounter from "@/components/VisitorCounter";
import Footer from "@/components/Footer";

const Index = () => {
  const waitlistRef = useRef<HTMLDivElement>(null);

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Hero onJoinWaitlist={scrollToWaitlist} />
      <WhatIsLexa />
      <WhyLexa />
      <div ref={waitlistRef}>
        <WaitlistForm />
      </div>
      <Footer />
      <VisitorCounter />
    </div>
  );
};

export default Index;