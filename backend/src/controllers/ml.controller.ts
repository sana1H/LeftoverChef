// ================================================
// src/controllers/ml.controller.ts
// ML Prediction Request Handlers
// ================================================

import { Response } from "express";
import { AuthRequest } from "../types";
import * as mlService from "../services/ml.service";
import fs from "fs";

// ================================================
// Controller Functions
// ================================================

/**
 * Upload Image and Get ML Predictions
 *
 * @route   POST /api/ml/predict
 * @access  Private (requires authentication)
 *
 * @body    multipart/form-data with 'file' field containing image
 *
 * Expected file formats: JPEG, PNG, WEBP
 * Max file size: 10MB
 */
export const predict = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  // Track if we need to clean up file on error
  let uploadedFilePath: string | null = null;

  try {
    // ====== Step 1: Verify Authentication ======
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required. Please login to use this feature.",
      });
      return;
    }

    // ====== Step 2: Verify File Upload ======
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No image file uploaded",
        hint: 'Please upload an image file using the "file" field in multipart/form-data',
        supportedFormats: ["JPEG", "PNG", "WEBP"],
        maxSize: "10MB",
      });
      return;
    }

    // Store file path for potential cleanup
    uploadedFilePath = req.file.path;

    // ====== Step 3: Log Request Details ======
    console.log("");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📸 New Prediction Request");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`   User: ${req.user.email}`);
    console.log(`   File: ${req.file.originalname}`);
    console.log(`   Size: ${(req.file.size / 1024).toFixed(2)} KB`);
    console.log(`   Type: ${req.file.mimetype}`);
    console.log(`   Saved as: ${req.file.filename}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // ====== Step 4: Process Image with ML Service ======
    const prediction = await mlService.processImagePrediction(
      req.user.id,
      req.file.path
    );

    // ====== Step 5: Send Success Response ======
    res.status(200).json({
      success: true,
      message: "Image processed successfully",
      data: {
        _id: prediction._id,
        userId: prediction.userId,
        imagePath: prediction.imagePath,
        predictions: prediction.predictions,
        createdAt: prediction.createdAt,
      },
    });
  } catch (error: any) {
    console.error("❌ Prediction Error:", error.message);

    // ====== Clean up uploaded file on error ======
    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      try {
        fs.unlinkSync(uploadedFilePath);
        console.log("🗑️  Cleaned up file after error");
      } catch (cleanupError) {
        console.warn("⚠️  Could not clean up file:", cleanupError);
      }
    }

    // ====== Send Error Response ======
    // Handle specific error types
    if (error.message.includes("ML service")) {
      res.status(503).json({
        success: false,
        message: "ML service is temporarily unavailable",
        error: error.message,
        hint: "Please try again in a few moments",
      });
      return;
    }

    if (error.message.includes("file not found")) {
      res.status(400).json({
        success: false,
        message: "File upload failed",
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to process image",
      error: error.message,
    });
  }
};

/**
 * Get Supported File Formats
 *
 * @route   GET /api/ml/formats
 * @access  Public
 */
export const getSupportedFormats = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  res.status(200).json({
    success: true,
    data: {
      supportedFormats: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
      extensions: [".jpg", ".jpeg", ".png", ".webp"],
      maxFileSize: "10MB",
      maxFileSizeBytes: 10 * 1024 * 1024,
    },
  });
};

/**
 * Health Check for ML Service
 *
 * @route   GET /api/ml/health
 * @access  Public
 */
export const healthCheck = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const mlApiUrl = process.env.ML_API_URL;

  res.status(200).json({
    success: true,
    data: {
      mlServiceConfigured:
        !!mlApiUrl && mlApiUrl !== "https://mock-ml-api.example.com/predict",
      mlServiceUrl: mlApiUrl ? "Configured" : "Not configured (using mock)",
      status: "operational",
    },
  });
};
