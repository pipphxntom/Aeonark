import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Code, Smartphone, Palette, Bot, MessageSquare, BarChart3 
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom websites and web applications built with modern frameworks and techniques to deliver exceptional performance.",
    icon: <Code className="h-6 w-6 text-[hsl(var(--neon-blue))]" />,
    color: "neon-blue"
  },
  {
    id: 2,
    title: "App Development",
    description: "Beautiful, functional mobile applications for iOS and Android that engage users and drive results for your business.",
    icon: <Smartphone className="h-6 w-6 text-[hsl(var(--neon-green))]" />,
    color: "neon-green"
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "User-focused design that creates intuitive, engaging experiences that keep users coming back.",
    icon: <Palette className="h-6 w-6 text-[hsl(var(--neon-purple))]" />,
    color: "neon-purple"
  },
  {
    id: 4,
    title: "AI Agent Creation",
    description: "Custom chatbots and automated systems that streamline workflows and enhance customer service capabilities.",
    icon: <Bot className="h-6 w-6 text-[hsl(var(--neon-blue))]" />,
    color: "neon-blue"
  },
  {
    id: 5,
    title: "Consultation Services",
    description: "Expert guidance on digital strategy, product development, and technical implementation for your business.",
    icon: <MessageSquare className="h-6 w-6 text-[hsl(var(--neon-green))]" />,
    color: "neon-green"
  },
  {
    id: 6,
    title: "Data Analytics",
    description: "Comprehensive data collection, analysis, and visualization tools to help you make informed business decisions.",
    icon: <BarChart3 className="h-6 w-6 text-[hsl(var(--neon-purple))]" />,
    color: "neon-purple"
  }
];

export default function ServiceCards() {
  return (
    <section id="services" className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(57,255,20,0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={1}>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-16">
            Comprehensive digital solutions to power your online presence and business operations.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index + 2}>
              <div className={`bg-card rounded-xl p-6 border border-[hsl(var(--${service.color}))]/10 card-hover`}>
                <div className="flex items-start mb-5">
                  <div className={`w-12 h-12 rounded-lg bg-[hsl(var(--${service.color}))]/10 flex items-center justify-center mr-4`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-foreground/70 text-sm mb-5">
                  {service.description}
                </p>
                <Link href="/contact">
                  <Button asChild className={`py-2 px-4 rounded-lg bg-[hsl(var(--${service.color}))]/10 text-[hsl(var(--${service.color}))] hover:bg-[hsl(var(--${service.color}))]/20 transition-all`}>
                    <a>Get Quote</a>
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
