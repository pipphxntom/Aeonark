import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authSchema, otpVerificationSchema, onboardingSchema, emailCheckSchema, signupSchema, loginSchema } from "@shared/schema";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Resend } from "resend";
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Supabase client with proper URL format
const rawUrl = process.env.SUPABASE_URL || '';
const supabaseUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
const supabase = createClient(
  supabaseUrl,
  process.env.SUPABASE_ANON_KEY!
);

// JWT secret - in production, use a proper secret from environment
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Helper function to generate 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', message: 'Aeonark Labs API is up and running!' });
  });

  // Enhanced authentication endpoints
  
  // Check if email exists (determines signup vs login flow)
  app.post('/api/auth/check-email', async (req, res) => {
    try {
      const { email } = emailCheckSchema.parse(req.body);
      
      // Check if user exists in our database
      const existingUser = await storage.getUserByEmail(email);
      
      res.json({
        success: true,
        exists: !!existingUser,
        isOnboarded: existingUser?.isOnboarded || false,
      });
    } catch (error) {
      console.error("Error checking email:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid email address" });
      }
      res.status(500).json({ error: "Failed to check email" });
    }
  });

  // Signup endpoint - sends OTP for first-time users using Resend
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const { email } = signupSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists. Please use login instead." });
      }

      // Generate and store OTP
      const otp = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Store OTP in database
      await storage.storeOtp(email, otp, otpExpiry);

      // Send OTP via Resend
      const { data, error } = await resend.emails.send({
        from: 'Aeonark Labs <noreply@aeonark.com>',
        to: [email],
        subject: 'Your Aeonark Labs Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #22c55e;">Welcome to Aeonark Labs!</h2>
            <p>Your verification code is:</p>
            <h1 style="font-size: 36px; color: #22c55e; letter-spacing: 8px; text-align: center; margin: 20px 0;">${otp}</h1>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">© 2025 Aeonark Labs. All rights reserved.</p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend signup error:", error);
        return res.status(400).json({ error: "Failed to send verification email" });
      }

      console.log("Resend signup OTP sent successfully:", data);
      res.json({ 
        success: true, 
        message: "Signup OTP sent successfully",
        mode: "signup"
      });
    } catch (error) {
      console.error("Error in signup:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid email address" });
      }
      res.status(500).json({ error: "Failed to send signup OTP" });
    }
  });

  // Login endpoint - sends OTP for existing users using Resend
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email } = loginSchema.parse(req.body);
      
      // Check if user exists
      const existingUser = await storage.getUserByEmail(email);
      if (!existingUser) {
        return res.status(400).json({ error: "User not found. Please sign up first." });
      }

      // Generate and store OTP
      const otp = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Store OTP in database
      await storage.storeOtp(email, otp, otpExpiry);

      // Send OTP via Resend
      const { data, error } = await resend.emails.send({
        from: 'Aeonark Labs <noreply@aeonark.com>',
        to: [email],
        subject: 'Your Aeonark Labs Login Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #22c55e;">Welcome back to Aeonark Labs!</h2>
            <p>Your login code is:</p>
            <h1 style="font-size: 36px; color: #22c55e; letter-spacing: 8px; text-align: center; margin: 20px 0;">${otp}</h1>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">© 2025 Aeonark Labs. All rights reserved.</p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend login error:", error);
        return res.status(400).json({ error: "Failed to send login email" });
      }

      console.log("Resend login OTP sent successfully:", data);
      res.json({ 
        success: true, 
        message: "Login OTP sent successfully",
        mode: "login",
        isOnboarded: existingUser.isOnboarded
      });
    } catch (error) {
      console.error("Error in login:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid email address" });
      }
      res.status(500).json({ error: "Failed to send login OTP" });
    }
  });

  // Custom OTP verification with Resend
  app.post('/api/auth/verify-otp', async (req, res) => {
    try {
      const { email, code } = otpVerificationSchema.parse(req.body);
      
      // Verify OTP from our database
      const validOtp = await storage.getValidOtp(email, code);
      
      if (!validOtp) {
        return res.status(400).json({ error: "Invalid or expired OTP code" });
      }

      // Delete the used OTP
      await storage.deleteOtp(email, code);

      // Check if user exists in our database
      let user = await storage.getUserByEmail(email);
      
      if (!user) {
        // Create new user in our database
        user = await storage.createUser({
          email: email,
          isOnboarded: false,
        });

        // Send admin notification for new user
        try {
          await resend.emails.send({
            from: 'Aeonark Labs <noreply@aeonark.com>',
            to: ['aeonark.lab@gmail.com'],
            subject: 'New User Signup - Aeonark Labs',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #22c55e;">New User Signup</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                <p>User has successfully completed email verification.</p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error("Failed to send admin notification:", emailError);
        }
      }

      // Generate JWT token for our app
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          company: user.company,
          primaryGoal: user.primaryGoal,
          buildGoal: user.buildGoal,
          isOnboarded: user.isOnboarded,
        },
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid OTP format" });
      }
      res.status(500).json({ error: "Failed to verify OTP" });
    }
  });

  // Onboarding endpoint
  app.post('/api/onboarding', authenticateToken, async (req: any, res) => {
    try {
      const onboardingData = onboardingSchema.parse(req.body);
      
      // Update user with onboarding data
      const user = await storage.updateUser(req.user.userId, {
        ...onboardingData,
        isOnboarded: true,
      });

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          company: user.company,
          primaryGoal: user.primaryGoal,
          buildGoal: user.buildGoal,
          isOnboarded: user.isOnboarded,
        },
      });
    } catch (error) {
      console.error("Error completing onboarding:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      res.status(500).json({ error: "Failed to complete onboarding" });
    }
  });

  // Get current user endpoint
  app.get('/api/user', authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          company: user.company,
          primaryGoal: user.primaryGoal,
          buildGoal: user.buildGoal,
          isOnboarded: user.isOnboarded,
        },
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user data" });
    }
  });

  // Cart endpoints
  app.get('/api/cart', authenticateToken, async (req: any, res) => {
    try {
      const cartItem = await storage.getCartByUserId(req.user.userId);
      
      res.json({
        success: true,
        cartItem: cartItem || null,
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post('/api/cart', authenticateToken, async (req: any, res) => {
    try {
      const { planType, planName, addOns = [] } = req.body;
      
      if (!planType || !planName) {
        return res.status(400).json({ error: "Plan type and name are required" });
      }

      // Check if user already has a cart item
      const existingCart = await storage.getCartByUserId(req.user.userId);
      
      let cartItem;
      if (existingCart) {
        // Update existing cart
        cartItem = await storage.updateCartItem(existingCart.id, {
          planType,
          planName,
          addOns,
        });
      } else {
        // Create new cart
        cartItem = await storage.createCartItem({
          userId: req.user.userId,
          planType,
          planName,
          addOns,
        });
      }

      // Get user data for admin notification
      const user = await storage.getUser(req.user.userId);
      
      // Send admin notification email
      if (user) {
        await resend.emails.send({
          from: "Aeonark Labs <onboarding@resend.dev>",
          to: "aeonark.lab@gmail.com",
          subject: "🧠 New User Joined Aeonark Labs",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">🧠 New User Joined Aeonark Labs</h2>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                <p><strong>Name:</strong> ${user.fullName || 'Not provided'}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Company:</strong> ${user.company || 'Not provided'}</p>
                <p><strong>Selected Plan:</strong> ${planName} (${planType})</p>
                <p><strong>Primary Goal:</strong> ${user.primaryGoal || 'Not provided'}</p>
                <p><strong>Build Goal:</strong> ${user.buildGoal || 'Not provided'}</p>
                <p><strong>Add-ons:</strong> ${addOns.length > 0 ? addOns.map((addon: any) => addon.name).join(', ') : 'None'}</p>
              </div>
              <p style="color: #666; font-size: 12px;">
                Time: ${new Date().toISOString()}
              </p>
            </div>
          `,
          text: `New User Joined Aeonark Labs

Name: ${user.fullName || 'Not provided'}
Email: ${user.email}
Company: ${user.company || 'Not provided'}
Selected Plan: ${planName} (${planType})
Primary Goal: ${user.primaryGoal || 'Not provided'}
Build Goal: ${user.buildGoal || 'Not provided'}
Add-ons: ${addOns.length > 0 ? addOns.map((addon: any) => addon.name).join(', ') : 'None'}

Time: ${new Date().toISOString()}`,
        });
      }

      res.json({
        success: true,
        cartItem,
      });
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Failed to update cart" });
    }
  });

  // Contact form endpoint (existing)
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
        message: 'There was an error sending your message. Please try again later.'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}