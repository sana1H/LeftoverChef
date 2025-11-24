// ================================================
// src/models/Prediction.model.ts
// Prediction Schema and Model Definition
// ================================================

import mongoose, { Schema } from "mongoose";
import { IPrediction } from "../types";

/**
 * Prediction Schema
 * Stores ML prediction results for uploaded food images
 *
 * Fields:
 * - userId: Reference to the user who made the prediction
 * - imagePath: Path to the uploaded image file
 * - predictions: Array of detected ingredients with confidence scores
 * - createdAt: Auto-generated timestamp
 * - updatedAt: Auto-updated timestamp
 */
const PredictionSchema: Schema<IPrediction> = new Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      ref: "User", // Reference to User model
      index: true, // Index for faster queries by user
    },
    imagePath: {
      type: String,
      required: [true, "Image path is required"],
    },
    predictions: [
      {
        name: {
          type: String,
          required: [true, "Ingredient name is required"],
          trim: true,
          lowercase: true, // Store ingredient names in lowercase
        },
        confidence: {
          type: Number,
          required: [true, "Confidence score is required"],
          min: [0, "Confidence must be at least 0"],
          max: [1, "Confidence cannot exceed 1"],
        },
      },
    ],
  },
  {
    // Automatically manage createdAt and updatedAt fields
    timestamps: true,
    // Convert to JSON without __v
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ================================================
// Indexes
// ================================================

// Compound index for efficient user history queries (sorted by date)
PredictionSchema.index({ userId: 1, createdAt: -1 });

// Index for querying by creation date
PredictionSchema.index({ createdAt: -1 });

// ================================================
// Virtual Fields
// ================================================

// Virtual for getting the top prediction (highest confidence)
PredictionSchema.virtual("topPrediction").get(function () {
  if (this.predictions && this.predictions.length > 0) {
    return this.predictions.reduce((max, pred) =>
      pred.confidence > max.confidence ? pred : max
    );
  }
  return null;
});

// Virtual for getting ingredient names only
PredictionSchema.virtual("ingredientNames").get(function () {
  return this.predictions.map((p) => p.name);
});

// ================================================
// Instance Methods
// ================================================

// Method to get predictions above a certain confidence threshold
PredictionSchema.methods.getHighConfidencePredictions = function (
  threshold: number = 0.7
) {
  return this.predictions.filter(
    (p: { confidence: number }) => p.confidence >= threshold
  );
};

// ================================================
// Static Methods
// ================================================

// Static method to get user's prediction count
PredictionSchema.statics.getUserPredictionCount = async function (
  userId: string
) {
  return this.countDocuments({ userId });
};

// ================================================
// Export Model
// ================================================

const Prediction = mongoose.model<IPrediction>("Prediction", PredictionSchema);

export default Prediction;
