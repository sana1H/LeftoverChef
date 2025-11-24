// ================================================
// src/routes/auth.routes.ts
// Authentication API Routes
// ================================================

import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

// Create router instance
const router = Router();

// ================================================
// Route Definitions
// ================================================

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 *
 * @body {
 *   name: string (required) - 2-50 characters
 *   email: string (required) - valid email format
 *   password: string (required) - minimum 6 characters
 * }
 *
 * @returns {
 *   success: boolean
 *   message: string
 *   token: string (JWT)
 *   user: { _id, name, email, createdAt }
 * }
 */
router.post("/register", authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login existing user
 * @access  Public
 *
 * @body {
 *   email: string (required)
 *   password: string (required)
 * }
 *
 * @returns {
 *   success: boolean
 *   message: string
 *   token: string (JWT)
 *   user: { _id, name, email, createdAt }
 * }
 */
router.post("/login", authController.login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user's profile
 * @access  Private (requires Bearer token)
 *
 * @headers {
 *   Authorization: Bearer <token>
 * }
 *
 * @returns {
 *   success: boolean
 *   user: { _id, name, email, createdAt, updatedAt }
 * }
 */
router.get("/me", protect, authController.getMe);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private (requires Bearer token)
 *
 * @headers {
 *   Authorization: Bearer <token>
 * }
 *
 * @body {
 *   name?: string
 *   email?: string
 * }
 *
 * @returns {
 *   success: boolean
 *   message: string
 *   user: { _id, name, email, createdAt, updatedAt }
 * }
 */
router.put("/profile", protect, authController.updateProfile);

// ================================================
// Export Router
// ================================================

export default router;
