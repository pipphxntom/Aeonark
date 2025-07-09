import { supabase } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  isOnboarded: boolean;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  supabaseSession?: any;
}

export const authService = {
  // Check if email exists (determines signup vs login flow)
  async checkEmail(email: string): Promise<{
    exists: boolean;
    isOnboarded: boolean;
  }> {
    const response = await fetch('/api/auth/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to check email');
    }
    
    const data = await response.json();
    return {
      exists: data.exists,
      isOnboarded: data.isOnboarded,
    };
  },

  // Send OTP for signup
  async signup(email: string): Promise<void> {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send signup OTP');
    }
  },

  // Send OTP for login
  async login(email: string): Promise<{
    isOnboarded: boolean;
  }> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send login OTP');
    }
    
    const data = await response.json();
    return {
      isOnboarded: data.isOnboarded,
    };
  },

  // Verify OTP
  async verifyOtp(email: string, code: string): Promise<AuthSession> {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to verify OTP');
    }
    
    const data = await response.json();
    return {
      user: data.user,
      token: data.token,
      supabaseSession: data.supabaseSession,
    };
  },

  // Get stored session
  getStoredSession(): AuthSession | null {
    const stored = localStorage.getItem('auth_session');
    if (!stored) return null;
    
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  // Store session
  storeSession(session: AuthSession): void {
    localStorage.setItem('auth_session', JSON.stringify(session));
  },

  // Clear session
  clearSession(): void {
    localStorage.removeItem('auth_session');
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const session = this.getStoredSession();
    return !!session?.token;
  },

  // Get current user
  getCurrentUser(): AuthUser | null {
    const session = this.getStoredSession();
    return session?.user || null;
  },

  // Initialize Supabase session
  async initializeSupabaseSession(): Promise<void> {
    const session = this.getStoredSession();
    if (session?.supabaseSession) {
      await supabase.auth.setSession(session.supabaseSession);
    }
  },

  // Sign out
  async signOut(): Promise<void> {
    await supabase.auth.signOut();
    this.clearSession();
  },
};