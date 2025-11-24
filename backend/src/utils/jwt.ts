// ================================================
// src/utils/jwt.ts
// JWT (JSON Web Token) Utility Functions
// ================================================

import jwt, { SignOptions } from "jsonwebtoken";

// ================================================
// Types
// ================================================

interface JWTPayload {
  id: string;
  email: string;
}

interface DecodedToken extends JWTPayload {
  iat: number;
  exp: number;
}

// ================================================
// Functions
// ================================================

/**
 * Generate JWT Token
 */
export const generateToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET as string;

  if (!secret) {
    throw new Error(
      "JWT_SECRET is not defined in environment variables. Add it to .env."
    );
  }

  // Accept both number and string expiry safely
  const expiresInValue: number | string = process.env.JWT_EXPIRES_IN || "30d";

  // FIX: Cast expiresIn to any to satisfy old jsonwebtoken typings
  const options: SignOptions = {
    expiresIn: expiresInValue as any,
  };

  return jwt.sign(payload, secret, options);
};

/**
 * Verify JWT Token
 */
export const verifyToken = (token: string): JWTPayload => {
  const secret = process.env.JWT_SECRET as string;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;

    return {
      id: decoded.id,
      email: decoded.email,
    };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired. Please login again.");
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token. Please login again.");
    }
    if (error.name === "NotBeforeError") {
      throw new Error("Token is not yet valid.");
    }

    throw new Error("Token verification failed.");
  }
};

/**
 * Decode Token (unsafe)
 */
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwt.decode(token) as DecodedToken;
  } catch {
    return null;
  }
};

/**
 * Check if Token Expired
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  return decoded.exp * 1000 < Date.now();
};
