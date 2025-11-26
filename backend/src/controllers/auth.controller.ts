// // src/controllers/auth.controller.ts
import { Response } from "express";
import { AuthRequest } from "../types";

export const register = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Temporary implementation - will be replaced
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          _id: "temp-id",
          name: req.body.name,
          email: req.body.email
        },
        token: "temp-token"
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Temporary implementation - will be replaced
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: {
          _id: "temp-id",
          name: "Test User",
          email: req.body.email
        },
        token: "temp-token"
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};