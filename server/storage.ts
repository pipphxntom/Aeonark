import { users, otpCodes, cartItems, type User, type InsertUser, type OtpCode, type InsertOtp, type CartItem, type InsertCartItem } from "@shared/schema";
import { db } from "./db";
import { eq, and, gt, sql } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  
  // OTP management
  createOtp(insertOtp: InsertOtp): Promise<OtpCode>;
  getValidOtp(email: string, code: string): Promise<OtpCode | undefined>;
  incrementOtpAttempts(email: string, code: string): Promise<void>;
  deleteOtp(email: string, code: string): Promise<void>;
  cleanupExpiredOtps(): Promise<void>;
  
  // Cart management
  getCartByUserId(userId: number): Promise<CartItem | undefined>;
  createCartItem(insertCartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, updates: Partial<CartItem>): Promise<CartItem>;
  deleteCartItem(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User management
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // OTP management
  async createOtp(insertOtp: InsertOtp): Promise<OtpCode> {
    // Delete any existing OTP for this email first
    await db.delete(otpCodes).where(eq(otpCodes.email, insertOtp.email));
    
    const [otp] = await db
      .insert(otpCodes)
      .values({
        ...insertOtp,
        attempts: 0,
        createdAt: new Date(),
      })
      .returning();
    return otp;
  }

  async getValidOtp(email: string, code: string): Promise<OtpCode | undefined> {
    const [otp] = await db
      .select()
      .from(otpCodes)
      .where(
        and(
          eq(otpCodes.email, email),
          eq(otpCodes.code, code),
          gt(otpCodes.expiresAt, new Date())
        )
      );
    return otp || undefined;
  }

  async incrementOtpAttempts(email: string, code: string): Promise<void> {
    await db
      .update(otpCodes)
      .set({
        attempts: sql`${otpCodes.attempts} + 1`,
      })
      .where(
        and(
          eq(otpCodes.email, email),
          eq(otpCodes.code, code)
        )
      );
  }

  async deleteOtp(email: string, code: string): Promise<void> {
    await db
      .delete(otpCodes)
      .where(
        and(
          eq(otpCodes.email, email),
          eq(otpCodes.code, code)
        )
      );
  }

  async cleanupExpiredOtps(): Promise<void> {
    await db.delete(otpCodes).where(gt(sql`now()`, otpCodes.expiresAt));
  }

  // Cart management
  async getCartByUserId(userId: number): Promise<CartItem | undefined> {
    const [cartItem] = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.userId, userId));
    return cartItem || undefined;
  }

  async createCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const [cartItem] = await db
      .insert(cartItems)
      .values({
        ...insertCartItem,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return cartItem;
  }

  async updateCartItem(id: number, updates: Partial<CartItem>): Promise<CartItem> {
    const [cartItem] = await db
      .update(cartItems)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(cartItems.id, id))
      .returning();
    return cartItem;
  }

  async deleteCartItem(id: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }
}

export const storage = new DatabaseStorage();
