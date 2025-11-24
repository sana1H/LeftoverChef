// ================================================
// src/services/auth.service.ts
// Authentication Business Logic
// ================================================

import bcrypt from "bcryptjs";
import User from "../models/User.model";
import { RegisterDTO, LoginDTO } from "../types";
import { generateToken } from "../utils/jwt";

// ================================================
// Constants
// ================================================

// Number of salt rounds for bcrypt (higher = more secure but slower)
const SALT_ROUNDS = 10;

// ================================================
// Service Functions
// ================================================

/**
 * Register a new user
 *
 * @param data - Registration data (name, email, password)
 * @returns Object with token and user data
 * @throws Error if email already exists or validation fails
 *
 * @example
 * const result = await registerUser({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'securePassword123'
 * });
 */
export const registerUser = async (data: RegisterDTO) => {
  const { name, email, password } = data;

  // ====== Step 1: Check if user already exists ======
  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    throw new Error(
      "A user with this email already exists. Please login or use a different email."
    );
  }

  // ====== Step 2: Hash the password ======
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ====== Step 3: Create the user ======
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
  });

  // ====== Step 4: Generate JWT token ======
  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
  });

  // ====== Step 5: Return token and safe user data ======
  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  };
};

/**
 * Login an existing user
 *
 * @param data - Login data (email, password)
 * @returns Object with token and user data
 * @throws Error if credentials are invalid
 *
 * @example
 * const result = await loginUser({
 *   email: 'john@example.com',
 *   password: 'securePassword123'
 * });
 */
export const loginUser = async (data: LoginDTO) => {
  const { email, password } = data;

  // ====== Step 1: Find user by email ======
  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    // Use generic message to prevent email enumeration
    throw new Error("Invalid email or password");
  }

  // ====== Step 2: Verify password ======
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // ====== Step 3: Generate JWT token ======
  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
  });

  // ====== Step 4: Return token and safe user data ======
  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  };
};

/**
 * Get user by ID
 *
 * @param userId - MongoDB ObjectId of the user
 * @returns User document without password
 * @throws Error if user not found
 *
 * @example
 * const user = await getUserById('507f1f77bcf86cd799439011');
 */
export const getUserById = async (userId: string) => {
  // Find user and exclude password field
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Update user profile
 *
 * @param userId - MongoDB ObjectId of the user
 * @param updateData - Fields to update (name, email)
 * @returns Updated user document
 * @throws Error if user not found or email already taken
 */
export const updateUser = async (
  userId: string,
  updateData: { name?: string; email?: string }
) => {
  // Check if email is being changed and if it's already taken
  if (updateData.email) {
    const emailTaken = await User.findOne({
      email: updateData.email.toLowerCase(),
      _id: { $ne: userId }, // Exclude current user
    });

    if (emailTaken) {
      throw new Error("This email is already in use by another account");
    }

    updateData.email = updateData.email.toLowerCase().trim();
  }

  // Update user
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Change user password
 *
 * @param userId - MongoDB ObjectId of the user
 * @param currentPassword - Current password for verification
 * @param newPassword - New password to set
 * @returns Success message
 * @throws Error if current password is wrong or user not found
 */
export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  // Find user with password
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordValid) {
    throw new Error("Current password is incorrect");
  }

  // Hash new password
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update password
  user.password = hashedPassword;
  await user.save();

  return { message: "Password changed successfully" };
};
