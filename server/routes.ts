import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', message: 'Aeonark Labs API is up and running!' });
  });

  // Test email endpoint
  app.post('/api/test-email', async (req, res) => {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const emailResult = await resend.emails.send({
        from: "Aeonark Labs Test <onboarding@resend.dev>",
        to: "aeonark.lab@gmail.com",
        subject: "Test Email - Please check spam folder",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333;">Test Email from Aeonark Labs</h2>
            <p>This is a test email to verify that emails are being sent correctly.</p>
            <p><strong>Please check your spam/junk folder if you don't see this email in your inbox.</strong></p>
            <p>Time sent: ${new Date().toISOString()}</p>
          </div>
        `,
        text: `Test Email from Aeonark Labs

This is a test email to verify that emails are being sent correctly.
Please check your spam/junk folder if you don't see this email in your inbox.

Time sent: ${new Date().toISOString()}`,
      });

      console.log("Test email sent successfully:", emailResult);
      res.json({ success: true, message: "Test email sent successfully", emailId: emailResult.data?.id });
    } catch (error) {
      console.error("Error sending test email:", error);
      res.status(500).json({ success: false, message: "Failed to send test email", error: error.message });
    }
  });

  // Contact form submission endpoint - now uses Resend to send emails
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please fill in all required fields' 
        });
      }

      // Import Resend dynamically
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Send email using Resend
      const emailResult = await resend.emails.send({
        from: "Aeonark Labs Contact <onboarding@resend.dev>", // Using Resend's verified domain
        to: "aeonark.lab@gmail.com",
        reply_to: email, // Allow replies to go to the person who submitted the form
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">New Contact Form Submission</h2>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="background: #fff; padding: 15px; border-left: 4px solid #0ea5e9; margin: 20px 0;">
              <h3>Message:</h3>
              <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #888;">
              This email was sent from the Aeonark Labs contact form on your website.
            </p>
          </div>
        `,
        text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent from the Aeonark Labs contact form on your website.
        `,
      });

      console.log("Email sent successfully:", emailResult);
      
      return res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send email. Please try again or contact us directly.'
      });
    }
  });




  const httpServer = createServer(app);

  return httpServer;
}