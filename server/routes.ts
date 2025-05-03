import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import archiver from 'archiver';
import path from 'path';
import fs from 'fs';

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

  app.get('/api/download', async (req, res) => {
    const projectDir = process.env.PROJECT_FILES_DIR;
    if (!projectDir) {
      return res.status(500).json({ error: 'PROJECT_FILES_DIR environment variable not set' });
    }

    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level
    });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=project.zip');

    archive.on('error', (err) => {
      console.error('Archive error:', err);
      res.status(500).send({ error: 'Failed to create archive' });
    });

    archive.pipe(res);

    const files = fs.readdirSync(projectDir);
    files.forEach(file => {
      archive.file(path.join(projectDir, file), { name: file });
    });

    await archive.finalize();
  });


  const httpServer = createServer(app);

  return httpServer;
}