// ================================================
// src/routes/history.routes.ts
// Prediction History API Routes
// ================================================

import { Router } from "express";
import * as historyController from "../controllers/history.controller";
import { protect } from "../middlewares/auth.middleware";

// Create router instance
const router = Router();

// ================================================
// Route Definitions
// ================================================

// Note: All routes require authentication (protect middleware)

/**
 * @route   GET /api/history
 * @desc    Get all predictions for the authenticated user
 * @access  Private (requires Bearer token)
 *
 * @headers {
 *   Authorization: Bearer <token>
 * }
 *
 * @query {
 *   page?: number - Page number (optional, for pagination)
 *   limit?: number - Items per page (optional, default: 10, max: 50)
 * }
 *
 * @returns {
 *   success: boolean
 *   count: number
 *   pagination?: { currentPage, totalPages, totalItems, hasNextPage, hasPrevPage }
 *   data: Array<Prediction>
 * }
 */
router.get("/", protect, historyController.getHistory);

/**
 * @route   GET /api/history/stats
 * @desc    Get prediction statistics for the authenticated user
 * @access  Private (requires Bearer token)
 *
 * @headers {
 *   Authorization: Bearer <token>
 * }
 *
 * @returns {
 *   success: boolean
 *   data: {
 *     totalPredictions: number
 *     uniqueIngredients: number
 *     topIngredients: Array<{ name: string, count: number }>
 *   }
 * }
 */
router.get("/stats", protect, historyController.getStats);

/**
 * @route   DELETE /api/history/clear-all
 * @desc    Delete all predictions for the authenticated user
 * @access  Private (requires Bearer token)
 *
 * @headers {
 *   Authorization: Bearer <token>
 * }
 *
 * @returns {
 *   success: boolean
 *   message: string
 *   deletedCount: number
 * }
 */
router.delete("/clear-all", protect, historyController.clearAllHistory);

/**
 * @route   GET /api/history/:id
 * @desc    Get a specific prediction by ID
 * @access  Private (requires Bearer token, user must own the prediction)
 *
 * @headers {
 *   Authorization: Bearer <token>
 * }
 *
 * @params {
 *   id: string - MongoDB ObjectId of the prediction
 * }
 *
 * @returns {
 *   success: boolean
 *   data: Prediction
 * }
 */
router.get("/:id", protect, historyController.getHistoryById);

/**
 * @route   DELETE /api/history/:id
 * @desc    Delete a specific prediction by ID
 * @access  Private (requires Bearer token, user must own the prediction)
 *
 * @headers {
 *   Authorization: Bearer <token>
 * }
 *
 * @params {
 *   id: string - MongoDB ObjectId of the prediction
 * }
 *
 * @returns {
 *   success: boolean
 *   message: string
 * }
 */
router.delete("/:id", protect, historyController.deleteHistory);

// ================================================
// Export Router
// ================================================

export default router;
