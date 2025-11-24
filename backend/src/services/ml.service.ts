// ================================================
// src/services/ml.service.ts
// ML Model Integration Service
// ================================================

import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import Prediction from "../models/prediction.model";
import { MLPredictionResponse } from "../types";

// ================================================
// Configuration
// ================================================

// Timeout for ML API requests (30 seconds)
const ML_API_TIMEOUT = 30000;

// ================================================
// Service Functions
// ================================================

/**
 * Process Image and Get ML Predictions
 *
 * This function:
 * 1. Reads the uploaded image file
 * 2. Sends it to the ML model API
 * 3. Saves the prediction results to MongoDB
 * 4. Returns the prediction data
 *
 * ⚠️ IMPORTANT: Replace ML_API_URL in .env with your actual ML model endpoint
 *
 * @param userId - ID of the user making the prediction
 * @param filePath - Full path to the uploaded image file
 * @returns Prediction document with results
 * @throws Error if ML API fails or file not found
 *
 * @example
 * const prediction = await processImagePrediction(
 *   '507f1f77bcf86cd799439011',
 *   '/path/to/uploads/image.jpg'
 * );
 */
export const processImagePrediction = async (
  userId: string,
  filePath: string
): Promise<any> => {
  try {
    // ====== Step 1: Validate file exists ======
    if (!fs.existsSync(filePath)) {
      throw new Error("Uploaded file not found. Please try uploading again.");
    }

    // ====== Step 2: Get ML API URL ======
    const mlApiUrl = process.env.ML_API_URL;

    if (!mlApiUrl) {
      console.warn("⚠️  ML_API_URL not configured. Using mock predictions.");
    }

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📤 Processing ML Prediction");
    console.log(`   User ID: ${userId}`);
    console.log(`   File: ${path.basename(filePath)}`);
    console.log(`   ML API: ${mlApiUrl || "MOCK MODE"}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // ====== Step 3: Prepare form data with image ======
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));

    // ====== Step 4: Call ML API or use mock data ======
    let predictions: MLPredictionResponse["predictions"];

    if (mlApiUrl && mlApiUrl !== "https://mock-ml-api.example.com/predict") {
      // ====== REAL ML API CALL ======
      try {
        console.log("🔄 Calling ML API...");

        const mlResponse = await axios.post<MLPredictionResponse>(
          mlApiUrl,
          formData,
          {
            headers: {
              ...formData.getHeaders(),
              // Add any additional headers your ML API requires
              // 'Authorization': 'Bearer YOUR_ML_API_KEY',
            },
            timeout: ML_API_TIMEOUT,
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          }
        );

        predictions = mlResponse.data.predictions;
        console.log("✅ ML API Response received");
        console.log(`   Detected ${predictions.length} ingredients`);
      } catch (mlError: any) {
        console.error("❌ ML API Error:", mlError.message);

        // Provide helpful error messages
        if (mlError.code === "ECONNREFUSED") {
          throw new Error(
            "ML service is not available. Please try again later."
          );
        }
        if (mlError.code === "ETIMEDOUT") {
          throw new Error("ML service timed out. Please try again.");
        }
        if (mlError.response?.status === 413) {
          throw new Error("Image file is too large for ML processing.");
        }

        throw new Error(`ML prediction failed: ${mlError.message}`);
      }
    } else {
      // ====== MOCK PREDICTIONS (for development/testing) ======
      console.log("🔄 Using MOCK predictions (ML_API_URL not configured)");

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock predictions - REPLACE THIS WITH REAL ML MODEL
      predictions = generateMockPredictions();

      console.log("⚠️  MOCK MODE: Replace ML_API_URL with your real endpoint");
    }

    // ====== Step 5: Get relative image path for storage ======
    const filename = path.basename(filePath);
    const imagePath = `/uploads/${filename}`;

    // ====== Step 6: Save prediction to database ======
    const prediction = await Prediction.create({
      userId,
      imagePath,
      predictions,
    });

    console.log("✅ Prediction saved to database");
    console.log(`   Prediction ID: ${prediction._id}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    return prediction;
  } catch (error: any) {
    console.error("❌ ML Service Error:", error.message);
    throw error;
  }
};

// ================================================
// Helper Functions
// ================================================

/**
 * Generate Mock Predictions
 * Used when ML API is not configured (for development)
 *
 * REMOVE THIS IN PRODUCTION - Replace with real ML model
 */
const generateMockPredictions = (): MLPredictionResponse["predictions"] => {
  // Sample ingredients with random confidence scores
  const ingredients = [
    "tomato",
    "onion",
    "garlic",
    "rice",
    "chicken",
    "potato",
    "carrot",
    "pepper",
    "egg",
    "cheese",
    "lettuce",
    "cucumber",
    "mushroom",
    "bread",
    "pasta",
  ];

  // Randomly select 3-6 ingredients
  const count = Math.floor(Math.random() * 4) + 3;
  const shuffled = ingredients.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  // Generate predictions with random confidence
  return selected
    .map((name) => ({
      name,
      confidence: Math.round((Math.random() * 0.4 + 0.6) * 100) / 100, // 0.60 - 1.00
    }))
    .sort((a, b) => b.confidence - a.confidence); // Sort by confidence desc
};

/**
 * Validate ML API Response Format
 * Ensures the ML API returns data in expected format
 */
export const validateMLResponse = (data: any): boolean => {
  if (!data || !data.predictions || !Array.isArray(data.predictions)) {
    return false;
  }

  return data.predictions.every(
    (p: any) =>
      typeof p.name === "string" &&
      typeof p.confidence === "number" &&
      p.confidence >= 0 &&
      p.confidence <= 1
  );
};
