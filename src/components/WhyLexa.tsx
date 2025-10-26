import { Brain, Zap, Link2 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Context Vault",
    description: "Store and reuse context anywhere.",
  },
  {
    icon: Zap,
    title: "Prompt Enhancer",
    description: "Make your prompts smarter in seconds.",
  },
  {
    icon: Link2,
    title: "Cross-Tool Sync",
    description: "Your AI remembers, even when you switch apps.",
  },
];

const WhyLexa = () => {
  return (
    <section className="py-20 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Lexa?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI tools are powerful, but painfully forgetful. Every tab, every chat, every tool starts from zero. Lexa keeps your flow going.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 shadow-soft border border-border transition-smooth hover:shadow-medium hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLexa;