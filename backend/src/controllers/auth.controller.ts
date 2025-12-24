// // src/controllers/auth.controller.ts
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/User.model.js";
import { AuthRequest } from "../types";
import { generateToken } from "../utils/jwt";

// Simple validators
const isValidEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
const isValidPassword = (password: string): boolean =>
  typeof password === "string" && password.length >= 6;

const sanitizeUser = (user: any) => {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.passwordHash;
  return obj;
};

/**
 * POST /api/auth/signup
 * Register a new user
 */
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, confirmPassword, phone, role } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      res.status(400).json({
        success: false,
        message: "Name, email, password and confirmPassword are required",
      });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
      return;
    }

    if (!isValidPassword(password)) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
      return;
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      res.status(409).json({
        success: false,
        message: "A user with this email already exists",
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone: phone || undefined,
      role: role || undefined, // will fall back to schema default
      passwordHash,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Signup successful. Please log in.",
      user: sanitizeUser(user),
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * POST /api/auth/login
 * Login user and return JWT + user
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, pushToken } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    const user: any = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.passwordHash) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Update lastActiveAt and optional pushToken
    user.lastActiveAt = new Date();
    if (pushToken) {
      user.pushToken = pushToken;
    }
    await user.save();

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * GET /api/auth/me
 * Get current authenticated user
 */
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user: sanitizeUser(req.user),
    });
  } catch (error: any) {
    console.error("getMe error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};