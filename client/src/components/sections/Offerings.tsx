import ScrollReveal from "@/components/ScrollReveal";
import { Monitor, Smartphone, Lightbulb } from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function Offerings() {
  return (
    <section className="py-16 bg-card/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,229,255,0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-16">
            Our <span className="text-gradient">Key Offerings</span>
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Full-stack Websites */}
          <ScrollReveal delay={1}>
            <div className="rounded-xl p-6 bg-card border border-[hsl(var(--neon-blue))]/20 card-hover">
              <div className="w-14 h-14 mb-4 rounded-lg bg-[hsl(var(--neon-blue))]/10 flex items-center justify-center">
                <Monitor className="h-8 w-8 text-[hsl(var(--neon-blue))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Full-stack Websites</h3>
              <p className="text-foreground/70 mb-4">
                Custom-built, responsive websites with powerful backend systems and databases that scale with your business.
              </p>
              <div className="mt-auto">
                <div className="flex items-center text-[hsl(var(--neon-blue))]">
                  <span className="mr-2 font-medium">Learn more</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Mobile-Friendly Apps */}
          <ScrollReveal delay={2}>
            <div className="rounded-xl p-6 bg-card border border-[hsl(var(--neon-green))]/20 card-hover">
              <div className="w-14 h-14 mb-4 rounded-lg bg-[hsl(var(--neon-green))]/10 flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-[hsl(var(--neon-green))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mobile-Friendly Apps</h3>
              <p className="text-foreground/70 mb-4">
                Cross-platform mobile applications that deliver native-like experiences while maintaining a single codebase.
              </p>
              <div className="mt-auto">
                <div className="flex items-center text-[hsl(var(--neon-green))]">
                  <span className="mr-2 font-medium">Learn more</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          {/* AI Agents and Automation */}
          <ScrollReveal delay={3}>
            <div className="rounded-xl p-6 bg-card border border-[hsl(var(--neon-purple))]/20 card-hover">
              <div className="w-14 h-14 mb-4 rounded-lg bg-[hsl(var(--neon-purple))]/10 flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-[hsl(var(--neon-purple))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Agents & Automation</h3>
              <p className="text-foreground/70 mb-4">
                Custom AI-powered agents and automation tools that streamline operations and enhance customer interactions.
              </p>
              <div className="mt-auto">
                <div className="flex items-center text-[hsl(var(--neon-purple))]">
                  <span className="mr-2 font-medium">Learn more</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
