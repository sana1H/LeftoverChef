// ================================================
// src/controllers/auth.controller.ts
// Authentication Request Handlers
// ================================================

import { Request, Response } from "express";
import { AuthRequest } from "../types";
import * as authService from "../services/auth.service";

// ================================================
// Controller Functions
// ================================================

/**
 * Register a New User
 *
 * @route   POST /api/auth/register
 * @access  Public
 *
 * @body {
 *   name: string,
 *   email: string,
 *   password: string
 * }
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // ====== Input Validation ======
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields",
        errors: {
          ...(!name && { name: "Name is required" }),
          ...(!email && { email: "Email is required" }),
          ...(!password && { password: "Password is required" }),
        },
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
      return;
    }

    // Validate password length
    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
      return;
    }

    // Validate name length
    if (name.length < 2 || name.length > 50) {
      res.status(400).json({
        success: false,
        message: "Name must be between 2 and 50 characters",
      });
      return;
    }

    // ====== Register User ======
    const result = await authService.registerUser({ name, email, password });

    // ====== Send Success Response ======
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: result.token,
      user: result.user,
    });
  } catch (error: any) {
    console.error("❌ Register Error:", error.message);

    // Handle specific errors
    if (error.message.includes("already exists")) {
      res.status(409).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: error.message || "Registration failed. Please try again.",
    });
  }
};

/**
 * Login User
 *
 * @route   POST /api/auth/login
 * @access  Public
 *
 * @body {
 *   email: string,
 *   password: string
 * }
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // ====== Input Validation ======
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide email and password",
        errors: {
          ...(!email && { email: "Email is required" }),
          ...(!password && { password: "Password is required" }),
        },
      });
      return;
    }

    // ====== Login User ======
    const result = await authService.loginUser({ email, password });

    // ====== Send Success Response ======
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error: any) {
    console.error("❌ Login Error:", error.message);

    res.status(401).json({
      success: false,
      message: error.message || "Invalid email or password",
    });
  }
};

/**
 * Get Current Authenticated User
 *
 * @route   GET /api/auth/me
 * @access  Private (requires authentication)
 */
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authenticated. Please login.",
      });
      return;
    }

    // ====== Get User Data ======
    const user = await authService.getUserById(req.user.id);

    // ====== Send Success Response ======
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.error("❌ Get Me Error:", error.message);

    if (error.message === "User not found") {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch user data",
    });
  }
};

/**
 * Update User Profile
 *
 * @route   PUT /api/auth/profile
 * @access  Private
 *
 * @body {
 *   name?: string,
 *   email?: string
 * }
 */
export const updateProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
      return;
    }

    const { name, email } = req.body;

    // At least one field required
    if (!name && !email) {
      res.status(400).json({
        success: false,
        message: "Please provide at least one field to update (name or email)",
      });
      return;
    }

    // Validate fields if provided
    if (name && (name.length < 2 || name.length > 50)) {
      res.status(400).json({
        success: false,
        message: "Name must be between 2 and 50 characters",
      });
      return;
    }

    if (email) {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          success: false,
          message: "Please provide a valid email address",
        });
        return;
      }
    }

    // Update user
    const user = await authService.updateUser(req.user.id, { name, email });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error: any) {
    console.error("❌ Update Profile Error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};
