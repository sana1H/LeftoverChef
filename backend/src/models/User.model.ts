// ================================================
// src/models/User.model.ts
// User Schema and Model Definition
// ================================================

import mongoose, { Schema } from "mongoose";
import { IUser } from "../types";

/**
 * User Schema
 * Defines the structure for user documents in MongoDB
 *
 * Fields:
 * - name: User's display name (2-50 characters)
 * - email: Unique email address (validated format)
 * - password: Hashed password (minimum 6 characters)
 * - createdAt: Auto-generated timestamp
 * - updatedAt: Auto-updated timestamp
 */
const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // <-- This already creates a unique index
      lowercase: true,
      trim: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      // Note: Password is hashed before saving in auth.service.ts
      // We don't select password by default for security
    },
  },
  {
    // Automatically manage createdAt and updatedAt fields
    timestamps: true,
    // Convert to JSON with virtuals and remove __v
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.password; // Never send password in response
        return ret;
      },
    },
  }
);

// ================================================
// Indexes
// ================================================

// ❌ Removed duplicate index:
// UserSchema.index({ email: 1 }, { unique: true });

// "unique: true" in the schema handles indexing correctly.

// ================================================
// Virtual Fields (computed properties)
// ================================================

// Virtual for user's initials
UserSchema.virtual("initials").get(function () {
  const names = this.name.split(" ");
  return names
    .map((n) => n[0])
    .join("")
    .toUpperCase();
});

// ================================================
// Instance Methods
// ================================================

// Method to get safe user data (without password)
UserSchema.methods.toSafeObject = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

// ================================================
// Export Model
// ================================================

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
