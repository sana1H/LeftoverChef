// // ================================================
// // src/routes/ml.routes.ts
// // ML Prediction API Routes
// // ================================================

// import { Router } from "express";
// import * as mlController from "../controllers/ml.controller";
// import { protect } from "../middlewares/auth.middleware";
// import { upload } from "../middlewares/upload.middleware";

// // Create router instance
// const router = Router();

// // ================================================
// // Route Definitions
// // ================================================

// /**
//  * @route   POST /api/ml/predict
//  * @desc    Upload an image and get ML predictions for food ingredients
//  * @access  Private (requires Bearer token)
//  *
//  * @headers {
//  *   Authorization: Bearer <token>
//  *   Content-Type: multipart/form-data
//  * }
//  *
//  * @body {
//  *   file: File (required) - Image file (JPEG, PNG, or WEBP)
//  * }
//  *
//  * @returns {
//  *   success: boolean
//  *   message: string
//  *   data: {
//  *     _id: string
//  *     userId: string
//  *     imagePath: string
//  *     predictions: Array<{ name: string, confidence: number }>
//  *     createdAt: Date
//  *   }
//  * }
//  *
//  * @example
//  * // Using fetch:
//  * const formData = new FormData();
//  * formData.append('file', imageFile);
//  *
//  * fetch('/api/ml/predict', {
//  *   method: 'POST',
//  *   headers: { 'Authorization': 'Bearer ' + token },
//  *   body: formData
//  * });
//  */
// router.post(
//   "/predict",
//   protect, // Verify JWT token
//   upload.single("file"), // Handle file upload (field name: 'file')
//   mlController.predict // Process prediction
// );

// /**
//  * @route   GET /api/ml/formats
//  * @desc    Get list of supported file formats
//  * @access  Public
//  *
//  * @returns {
//  *   success: boolean
//  *   data: {
//  *     supportedFormats: string[]
//  *     extensions: string[]
//  *     maxFileSize: string
//  *     maxFileSizeBytes: number
//  *   }
//  * }
//  */
// router.get("/formats", mlController.getSupportedFormats);

// /**
//  * @route   GET /api/ml/health
//  * @desc    Check ML service health/configuration
//  * @access  Public
//  *
//  * @returns {
//  *   success: boolean
//  *   data: {
//  *     mlServiceConfigured: boolean
//  *     mlServiceUrl: string
//  *     status: string
//  *   }
//  * }
//  */
// router.get("/health", mlController.healthCheck);

// // ================================================
// // Export Router
// // ================================================

// export default router;

// src/routes/ml.routes.ts
import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "ML routes working"
  });
});

export default router;