import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', message: 'Aeonark Labs API is up and running!' });
  });

  // Contact form submission endpoint - will just respond with success as per requirements
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    // In a real implementation, we would save this to a database
    // or send it via email, but for now we'll just return success

    return res.status(200).json({
      success: true,
      message: 'Your message has been received! We will get back to you soon.'
    });
  });




  const httpServer = createServer(app);

  return httpServer;
}