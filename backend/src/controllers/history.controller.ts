// ================================================
// src/controllers/history.controller.ts
// Prediction History Request Handlers
// ================================================

import { Response } from "express";
import { AuthRequest } from "../types";
import * as historyService from "../services/history.service";

// ================================================
// Controller Functions
// ================================================

/**
 * Get User's Prediction History
 *
 * @route   GET /api/history
 * @access  Private (requires authentication)
 *
 * @query   page - Page number (optional, default: 1)
 * @query   limit - Items per page (optional, default: 10, max: 50)
 */
export const getHistory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    // ====== Verify Authentication ======
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // ====== Check for pagination params ======
    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 0;

    let result;

    if (page > 0 || limit > 0) {
      // ====== Paginated Response ======
      result = await historyService.getUserPredictionsPaginated(
        req.user.id,
        page || 1,
        limit || 10
      );

      res.status(200).json({
        success: true,
        count: result.predictions.length,
        pagination: result.pagination,
        data: result.predictions,
      });
    } else {
      // ====== Full History (no pagination) ======
      const predictions = await historyService.getUserPredictions(req.user.id);

      res.status(200).json({
        success: true,
        count: predictions.length,
        data: predictions,
      });
    }
  } catch (error: any) {
    console.error("❌ Get History Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch prediction history",
      error: error.message,
    });
  }
};

/**
 * Get Single Prediction by ID
 *
 * @route   GET /api/history/:id
 * @access  Private (requires authentication)
 *
 * @param   id - Prediction ID (MongoDB ObjectId)
 */
export const getHistoryById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    // ====== Verify Authentication ======
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // ====== Validate ID Parameter ======
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Prediction ID is required",
      });
      return;
    }

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({
        success: false,
        message: "Invalid prediction ID format",
      });
      return;
    }

    // ====== Get Prediction ======
    const prediction = await historyService.getPredictionById(id, req.user.id);

    res.status(200).json({
      success: true,
      data: prediction,
    });
  } catch (error: any) {
    console.error("❌ Get History By ID Error:", error.message);

    if (
      error.message.includes("not found") ||
      error.message.includes("permission")
    ) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch prediction",
      error: error.message,
    });
  }
};

/**
 * Delete Prediction from History
 *
 * @route   DELETE /api/history/:id
 * @access  Private (requires authentication)
 *
 * @param   id - Prediction ID (MongoDB ObjectId)
 */
export const deleteHistory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    // ====== Verify Authentication ======
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // ====== Validate ID Parameter ======
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Prediction ID is required",
      });
      return;
    }

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({
        success: false,
        message: "Invalid prediction ID format",
      });
      return;
    }

    // ====== Delete Prediction ======
    await historyService.deletePrediction(id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Prediction deleted successfully",
    });
  } catch (error: any) {
    console.error("❌ Delete History Error:", error.message);

    if (
      error.message.includes("not found") ||
      error.message.includes("permission")
    ) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete prediction",
      error: error.message,
    });
  }
};

/**
 * Get User's Prediction Statistics
 *
 * @route   GET /api/history/stats
 * @access  Private (requires authentication)
 */
export const getStats = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const stats = await historyService.getUserPredictionStats(req.user.id);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    console.error("❌ Get Stats Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
};

/**
 * Clear All User History
 *
 * @route   DELETE /api/history/clear-all
 * @access  Private (requires authentication)
 */
export const clearAllHistory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const deletedCount = await historyService.deleteAllUserPredictions(
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: `Successfully deleted ${deletedCount} prediction(s)`,
      deletedCount,
    });
  } catch (error: any) {
    console.error("❌ Clear History Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to clear history",
      error: error.message,
    });
  }
};
