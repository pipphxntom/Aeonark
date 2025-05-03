import { Link } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter Pack",
    price: "₹9,999",
    color: "neon-blue",
    popular: false,
    valueText: "",
    features: [
      "Static Website (5 pages)",
      "Mobile Responsive",
      "SEO-Ready"
    ],
    cta: "Choose Plan",
    ctaLink: "/contact",
    ctaStyle: "text-[hsl(var(--neon-blue))] bg-[hsl(var(--neon-blue))]/10 hover:bg-[hsl(var(--neon-blue))]/20"
  },
  {
    name: "Growth Pack",
    price: "₹24,999",
    color: "neon-green",
    popular: true,
    valueText: "Worth ₹40K+ in value",
    features: [
      "Web App or Website",
      "Custom Dashboard",
      "Basic AI Agent",
      "Free Maintenance (1 Month)"
    ],
    cta: "Choose Plan",
    ctaLink: "/contact",
    ctaStyle: "bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-green))] text-background font-medium hover:shadow-lg hover:shadow-[hsl(var(--neon-green))]/20"
  },
  {
    name: "Scale Pack",
    price: "Starts at ₹59,999",
    color: "neon-purple",
    popular: false,
    valueText: "Node.js, Firebase, GPT-4 API",
    features: [
      "Full-stack App",
      "Advanced AI Integration",
      "Scalable Backend",
      "24/7 Support",
      "Dedicated Dev Support"
    ],
    cta: "Get Quote",
    ctaLink: "/contact",
    ctaStyle: "text-[hsl(var(--neon-purple))] bg-[hsl(var(--neon-purple))]/10 hover:bg-[hsl(var(--neon-purple))]/20"
  }
];

export default function PricingTiers() {
  return (
    <section className="py-20 bg-card/40 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(178,102,255,0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="text-gradient-purple">Pricing</span> Plans
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={1}>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-16">
            Flexible pricing options designed to meet the needs of businesses at every stage of growth.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <ScrollReveal 
              key={tier.name} 
              delay={index + 2}
              className={cn(
                "relative",
                tier.popular && "md:transform md:scale-[1.05] md:z-10"
              )}
            >
              <div className={cn(
                "bg-background rounded-xl overflow-hidden card-hover h-full flex flex-col",
                tier.popular && `shadow-xl shadow-[hsl(var(--${tier.color}))]/10 border border-[hsl(var(--${tier.color}))]/20`
              )}>
                <div className={cn(
                  "p-6 border-b border-foreground/10",
                  tier.popular && `bg-[hsl(var(--${tier.color}))]/5`
                )}>
                  <h3 className="text-xl font-semibold text-center">{tier.name}</h3>
                  <div className="text-center mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.valueText && (
                      <p className="text-sm text-foreground/60 mt-1">{tier.valueText}</p>
                    )}
                  </div>
                  {tier.popular && (
                    <div className="absolute top-4 right-4">
                      <span className={`bg-[hsl(var(--${tier.color}))] text-background text-xs px-2 py-1 rounded-full font-medium`}>
                        Most Popular
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className={`h-5 w-5 text-[hsl(var(--${tier.color}))] mr-3 flex-shrink-0`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <Link href={tier.ctaLink}>
                      <Button asChild className={cn("w-full py-3 rounded-lg transition-all", tier.ctaStyle)}>
                        <a>{tier.cta}</a>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
