// ================================================
// src/services/history.service.ts
// Prediction History Management Service
// ================================================

import Prediction from "../models/prediction.model";
import fs from "fs";
import path from "path";

// ================================================
// Service Functions
// ================================================

/**
 * Get All Predictions for a User
 * Returns predictions sorted by date (newest first)
 *
 * @param userId - MongoDB ObjectId of the user
 * @returns Array of prediction documents
 *
 * @example
 * const predictions = await getUserPredictions('507f1f77bcf86cd799439011');
 */
export const getUserPredictions = async (userId: string) => {
  const predictions = await Prediction.find({ userId })
    .sort({ createdAt: -1 }) // Newest first
    .select("-__v") // Exclude version key
    .lean(); // Return plain objects for better performance

  return predictions;
};

/**
 * Get Paginated Predictions for a User
 *
 * @param userId - MongoDB ObjectId of the user
 * @param page - Page number (starting from 1)
 * @param limit - Number of items per page
 * @returns Object with predictions and pagination info
 */
export const getUserPredictionsPaginated = async (
  userId: string,
  page: number = 1,
  limit: number = 10
) => {
  // Ensure valid pagination params
  const pageNum = Math.max(1, page);
  const limitNum = Math.min(50, Math.max(1, limit)); // Max 50 per page
  const skip = (pageNum - 1) * limitNum;

  // Get total count for pagination
  const total = await Prediction.countDocuments({ userId });

  // Get predictions
  const predictions = await Prediction.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum)
    .select("-__v")
    .lean();

  return {
    predictions,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalItems: total,
      itemsPerPage: limitNum,
      hasNextPage: pageNum < Math.ceil(total / limitNum),
      hasPrevPage: pageNum > 1,
    },
  };
};

/**
 * Get a Single Prediction by ID
 * Verifies that the prediction belongs to the user
 *
 * @param predictionId - MongoDB ObjectId of the prediction
 * @param userId - MongoDB ObjectId of the user (for ownership verification)
 * @returns Prediction document
 * @throws Error if prediction not found or unauthorized
 */
export const getPredictionById = async (
  predictionId: string,
  userId: string
) => {
  const prediction = await Prediction.findOne({
    _id: predictionId,
    userId, // Ensure user owns this prediction
  }).select("-__v");

  if (!prediction) {
    throw new Error(
      "Prediction not found or you do not have permission to access it."
    );
  }

  return prediction;
};

/**
 * Delete a Prediction
 * Removes prediction from database and deletes associated image file
 *
 * @param predictionId - MongoDB ObjectId of the prediction
 * @param userId - MongoDB ObjectId of the user (for ownership verification)
 * @returns true if deleted successfully
 * @throws Error if prediction not found or unauthorized
 */
export const deletePrediction = async (
  predictionId: string,
  userId: string
) => {
  // Find the prediction first to get image path
  const prediction = await Prediction.findOne({
    _id: predictionId,
    userId, // Ensure user owns this prediction
  });

  if (!prediction) {
    throw new Error(
      "Prediction not found or you do not have permission to delete it."
    );
  }

  // ====== Delete associated image file ======
  try {
    // Construct full path to image
    const imagePath = path.join(__dirname, "../..", prediction.imagePath);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`🗑️  Deleted image file: ${prediction.imagePath}`);
    } else {
      console.log(
        `⚠️  Image file not found (may have been deleted): ${prediction.imagePath}`
      );
    }
  } catch (fileError: any) {
    // Log warning but don't fail the deletion
    console.warn(`⚠️  Could not delete image file: ${fileError.message}`);
  }

  // ====== Delete prediction from database ======
  await Prediction.deleteOne({ _id: predictionId });

  console.log(`✅ Deleted prediction: ${predictionId}`);
  return true;
};

/**
 * Delete All Predictions for a User
 * Useful for account cleanup or GDPR compliance
 *
 * @param userId - MongoDB ObjectId of the user
 * @returns Number of deleted predictions
 */
export const deleteAllUserPredictions = async (userId: string) => {
  // Get all predictions to delete their images
  const predictions = await Prediction.find({ userId });

  // Delete image files
  for (const prediction of predictions) {
    try {
      const imagePath = path.join(__dirname, "../..", prediction.imagePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    } catch (error) {
      // Continue with other deletions even if one fails
    }
  }

  // Delete all predictions from database
  const result = await Prediction.deleteMany({ userId });

  console.log(
    `🗑️  Deleted ${result.deletedCount} predictions for user: ${userId}`
  );
  return result.deletedCount;
};

/**
 * Get Prediction Statistics for a User
 *
 * @param userId - MongoDB ObjectId of the user
 * @returns Statistics object
 */
export const getUserPredictionStats = async (userId: string) => {
  const totalPredictions = await Prediction.countDocuments({ userId });

  // Get all predictions to calculate ingredient stats
  const predictions = await Prediction.find({ userId }).lean();

  // Count unique ingredients
  const ingredientCounts: Record<string, number> = {};

  for (const pred of predictions) {
    for (const item of pred.predictions) {
      ingredientCounts[item.name] = (ingredientCounts[item.name] || 0) + 1;
    }
  }

  // Get top 5 most detected ingredients
  const topIngredients = Object.entries(ingredientCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  return {
    totalPredictions,
    uniqueIngredients: Object.keys(ingredientCounts).length,
    topIngredients,
  };
};
