// ================================================
// src/middlewares/auth.middleware.ts
// JWT Authentication Middleware
// ================================================

import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { verifyToken } from "../utils/jwt";
import User from "../models/User.model";

// ================================================
// Main Authentication Middleware
// ================================================

/**
 * Protect Middleware
 * Verifies JWT token and attaches user info to request
 *
 * Usage: Apply to routes that require authentication
 *
 * @example
 * router.get('/protected', protect, controller.handler);
 *
 * The token should be sent in the Authorization header:
 * Authorization: Bearer <token>
 */
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // ====== Step 1: Get token from header ======
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Access denied. No authorization header provided.",
        hint: "Include Authorization header with format: Bearer <token>",
      });
      return;
    }

    // Check if it's a Bearer token
    if (!authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Access denied. Invalid authorization format.",
        hint: "Use format: Bearer <token>",
      });
      return;
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.split(" ")[1];

    // Check if token exists after splitting
    if (!token || token === "null" || token === "undefined") {
      res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
      return;
    }

    // ====== Step 2: Verify token ======
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || "Invalid or expired token.",
        hint: "Please login again to get a new token.",
      });
      return;
    }

    // ====== Step 3: Check if user still exists ======
    // Optional: Verify user hasn't been deleted since token was issued
    const userExists = await User.exists({ _id: decoded.id });

    if (!userExists) {
      res.status(401).json({
        success: false,
        message: "User associated with this token no longer exists.",
        hint: "Please register or login with a valid account.",
      });
      return;
    }

    // ====== Step 4: Attach user info to request ======
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    // ====== Step 5: Continue to next middleware/controller ======
    next();
  } catch (error: any) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({
      success: false,
      message: "Authentication error occurred.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ================================================
// Optional Authentication Middleware
// ================================================

/**
 * Optional Auth Middleware
 * Attaches user info if token is valid, but doesn't block if no token
 * Useful for routes that work for both authenticated and anonymous users
 *
 * @example
 * router.get('/public', optionalAuth, controller.handler);
 */
export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    // If no auth header, just continue without user
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      next();
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token || token === "null" || token === "undefined") {
      next();
      return;
    }

    // Try to verify token
    try {
      const decoded = verifyToken(token);
      req.user = {
        id: decoded.id,
        email: decoded.email,
      };
    } catch {
      // Token invalid, but we don't block the request
      // Just continue without user info
    }

    next();
  } catch (error) {
    // On any error, just continue without user
    next();
  }
};
