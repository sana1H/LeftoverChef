// ================================================
// src/types/index.ts
// Central TypeScript models & API interfaces
// ================================================

import { Request } from "express";

// ================================================
// Database Model Interfaces (NOT extending mongoose Document)
// This makes them compatible with .lean(), .toObject(), etc.
// ================================================

/**
 * User Model Interface
 */
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Prediction Model Interface
 */
export interface IPrediction {
  _id: string;
  userId: string;
  imagePath: string;

  predictions: Array<{
    name: string;
    confidence: number;
  }>;

  createdAt: Date;
  updatedAt: Date;
}

// ================================================
// Request Interfaces
// ================================================

/**
 * AuthRequest (Used after JWT middleware)
 */
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// ================================================
// DTOs (Data Transfer Objects)
// ================================================

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

// ================================================
// API Response Interfaces
// ================================================

/**
 * ML Prediction API Response
 */
export interface MLPredictionResponse {
  predictions: Array<{
    name: string;
    confidence: number;
  }>;
}

/**
 * Generic API Response
 */
export interface APIResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/**
 * Authentication Response
 */
export interface AuthResponse {
  success: boolean;
  message: string;

  token?: string;

  user?: {
    _id: string;
    name: string;
    email: string;
    createdAt: Date;
  };
}

// ================================================
// Utility Types
// ================================================

/**
 * Single Prediction Item
 */
export interface PredictionItem {
  name: string;
  confidence: number;
}
