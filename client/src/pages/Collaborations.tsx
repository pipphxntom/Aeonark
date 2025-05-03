import { Helmet } from "react-helmet";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star } from "lucide-react";
import { Link } from "wouter";

// Sample collaborations data
const collaborations = [
  {
    id: 1,
    name: "TechNova Startup",
    description: "A cutting-edge fintech platform that simplifies investment processes for millennials.",
    scope: "Full-stack web application with AI-powered investment recommendations",
    logo: "⚡",
    color: "neon-blue",
    testimonial: {
      text: "Aeonark Labs transformed our vision into reality with exceptional technical expertise. Their AI implementation exceeded our expectations and helped us secure additional funding.",
      author: "Rohit Sharma",
      position: "CTO, TechNova"
    }
  },
  {
    id: 2,
    name: "HealthSync",
    description: "An innovative healthcare platform connecting patients with doctors for remote consultations.",
    scope: "HIPAA-compliant telehealth solution with real-time communication features",
    logo: "🩺",
    color: "neon-green",
    testimonial: {
      text: "Working with Aeonark Labs was a seamless experience. They understood the sensitive nature of healthcare data and built a secure, scalable platform that our users love.",
      author: "Dr. Priya Patel",
      position: "Founder, HealthSync"
    }
  },
  {
    id: 3,
    name: "EduReach",
    description: "A digital learning platform making quality education accessible to students across India.",
    scope: "Responsive web application with interactive content delivery and engagement tracking",
    logo: "📚",
    color: "neon-purple",
    testimonial: {
      text: "Aeonark Labs helped us scale our platform from serving hundreds to thousands of students. Their technical solutions are elegant and their support is outstanding.",
      author: "Amit Verma",
      position: "CEO, EduReach"
    }
  },
  {
    id: 4,
    name: "GreenEarth",
    description: "An eco-conscious platform connecting sustainable businesses with environmentally aware consumers.",
    scope: "Marketplace application with vendor management and carbon footprint tracking",
    logo: "🌱",
    color: "neon-blue",
    testimonial: {
      text: "The team at Aeonark Labs shares our passion for sustainability. They built us a platform that not only looks great but also effectively communicates our mission and values.",
      author: "Neha Singh",
      position: "Founder, GreenEarth"
    }
  },
  {
    id: 5,
    name: "FoodFest",
    description: "A food delivery aggregator focusing on local restaurants and authentic cuisine.",
    scope: "Mobile-first web application with real-time order tracking and restaurant management",
    logo: "🍔",
    color: "neon-green",
    testimonial: {
      text: "Aeonark Labs delivered our platform in record time without compromising on quality. Their attention to UI/UX details resulted in significantly higher user engagement than we anticipated.",
      author: "Vikram Kapoor",
      position: "Co-founder, FoodFest"
    }
  }
];

export default function Collaborations() {
  return (
    <>
      <Helmet>
        <title>Our Collaborations | Aeonark Labs</title>
        <meta name="description" content="Explore our successful collaborations and partnerships with innovative startups and established businesses across India." />
      </Helmet>
      
      <div className="pt-24 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--neon-purple))]/5 to-transparent"></div>
        <ScrollReveal>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient-purple">Collaborations</span>
            </h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              We've helped startups and businesses across India transform their ideas into successful digital products.
            </p>
          </div>
        </ScrollReveal>
      </div>
      
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(178,102,255,0.05),transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 gap-12">
            {collaborations.map((collab, index) => (
              <ScrollReveal key={collab.id} delay={index + 1} direction={index % 2 === 0 ? "left" : "right"}>
                <div className="bg-background rounded-xl overflow-hidden card-hover border border-foreground/5">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8">
                      <div className="flex items-center mb-4">
                        <div className={`flex items-center justify-center text-4xl p-4 rounded-lg bg-[hsl(var(--${collab.color}))]/10 mr-4`}>
                          {collab.logo}
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold">{collab.name}</h3>
                          <Badge variant="outline" className={`text-[hsl(var(--${collab.color}))] bg-[hsl(var(--${collab.color}))]/10 border-[hsl(var(--${collab.color}))]/20`}>
                            Success Story
                          </Badge>
                        </div>
                      </div>
                      <p className="text-foreground/80 mb-4">{collab.description}</p>
                      <h4 className="font-medium mb-2">Project Scope:</h4>
                      <p className="text-foreground/70 mb-6">{collab.scope}</p>
                    </div>
                    
                    <div className={`p-8 bg-[hsl(var(--${collab.color}))]/5 border-l border-foreground/5 flex flex-col`}>
                      <div className="flex-1">
                        <div className="flex items-center mb-4">
                          <MessageSquare className={`h-5 w-5 text-[hsl(var(--${collab.color}))] mr-2`} />
                          <h4 className="font-medium">Client Testimonial</h4>
                        </div>
                        <div className="flex space-x-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                          ))}
                        </div>
                        <blockquote className="italic text-foreground/80 mb-4">
                          "{collab.testimonial.text}"
                        </blockquote>
                      </div>
                      <div>
                        <p className="font-medium">{collab.testimonial.author}</p>
                        <p className="text-sm text-foreground/60">{collab.testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal delay={6}>
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-semibold mb-4">Ready to Build Something Amazing?</h3>
              <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
                Join our growing list of successful collaborations and let us help you bring your vision to life.
              </p>
              <Link href="/contact">
                <Button className="btn-gradient">
                  <a>Get in Touch</a>
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
