// 

import mongoose, { Schema, Document } from "mongoose";

export interface IPrediction extends Document {
  userId: mongoose.Types.ObjectId;
  imageUrl: string;
  imagePath: string;
  predictions: Array<{
    name: string;
    confidence: number;
  }>;
  freshness?: {
    status: "fresh" | "stale" | "spoiled";
    confidence: number;
    isEdible: boolean;
  };
  foodType?: string;
  verified: boolean;
  donationEligible: boolean;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const PredictionSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    predictions: [
      {
        name: {
          type: String,
          required: true,
        },
        confidence: {
          type: Number,
          required: true,
          min: 0,
          max: 1,
        },
      },
    ],
    freshness: {
      status: {
        type: String,
        enum: ["fresh", "stale", "spoiled"],
      },
      confidence: {
        type: Number,
        min: 0,
        max: 1,
      },
      isEdible: {
        type: Boolean,
      },
    },
    foodType: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    donationEligible: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Auto-set donationEligible based on freshness
PredictionSchema.pre("save", function (next) {
  if (this.freshness) {
    this.donationEligible =
      this.freshness.isEdible && this.freshness.confidence > 0.7;
    this.verified = this.donationEligible;
  }
  next();
});

// Index for better query performance
PredictionSchema.index({ userId: 1, createdAt: -1 });
PredictionSchema.index({ donationEligible: 1, status: 1 });

export default mongoose.model<IPrediction>("Prediction", PredictionSchema);