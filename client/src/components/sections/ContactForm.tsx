import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Linkedin, Github, MessageSquare, Calendar } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // In a real implementation, we would send this data to a server
    // Since we're keeping this static per requirements, we'll just log the data
    alert("Thanks for your message! We'll be in touch soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };
  
  return (
    <section className="py-20 bg-card/40 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(57,255,20,0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="text-gradient">Contact</span> Us
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={1}>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-16">
            Got a project in mind? Let's talk.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact form */}
          <ScrollReveal delay={2} className="lg:col-span-3">
            <div className="bg-background rounded-xl p-6 card-hover">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-foreground/10 focus:border-[hsl(var(--neon-blue))] transition-all" 
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-foreground/10 focus:border-[hsl(var(--neon-blue))] transition-all" 
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <Input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-foreground/10 focus:border-[hsl(var(--neon-blue))] transition-all" 
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5} 
                    className="w-full px-4 py-3 rounded-lg bg-card border border-foreground/10 focus:border-[hsl(var(--neon-blue))] transition-all" 
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
                <Button type="submit" className="btn-gradient">
                  Send Message
                </Button>
              </form>
            </div>
          </ScrollReveal>
          
          {/* Contact info */}
          <ScrollReveal delay={3} direction="right" className="lg:col-span-2">
            <div className="bg-background rounded-xl p-6 mb-6 card-hover">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--neon-blue))]/10 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-[hsl(var(--neon-blue))]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground/60">Email</h4>
                    <p>contact@aeonarklabs.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--neon-green))]/10 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-[hsl(var(--neon-green))]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground/60">Location</h4>
                    <p>Mumbai, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social links */}
            <div className="bg-background rounded-xl p-6 card-hover">
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center p-3 rounded-lg bg-card hover:bg-foreground/5 transition-all">
                  <Linkedin className="h-5 w-5 text-[hsl(var(--neon-blue))] mr-3" />
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="flex items-center p-3 rounded-lg bg-card hover:bg-foreground/5 transition-all">
                  <Github className="h-5 w-5 text-[hsl(var(--neon-green))] mr-3" />
                  <span>GitHub</span>
                </a>
                <a href="#" className="flex items-center p-3 rounded-lg bg-card hover:bg-foreground/5 transition-all">
                  <MessageSquare className="h-5 w-5 text-[hsl(var(--neon-purple))] mr-3" />
                  <span>WhatsApp</span>
                </a>
                <a href="#" className="flex items-center p-3 rounded-lg bg-card hover:bg-foreground/5 transition-all">
                  <Calendar className="h-5 w-5 text-[hsl(var(--neon-blue))] mr-3" />
                  <span>Calendly</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
