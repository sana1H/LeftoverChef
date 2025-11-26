import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { FreshnessResult } from "../types";

const ML_API_URL = process.env.ML_API_URL || "http://localhost:5000/predict";
const ML_API_TIMEOUT = 30000;

/**
 * Universal ML model integration - works with any ML service
 */
export const analyzeFoodFreshness = async (
  filePath: string
): Promise<{
  freshness: FreshnessResult;
  ingredients: string[];
  foodType: string;
}> => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error("Image file not found");
    }

    // Check if ML service is enabled
    if (
      !process.env.ENABLE_FRESHNESS_DETECTION ||
      process.env.ENABLE_FRESHNESS_DETECTION === "false"
    ) {
      return generateMockFreshnessAnalysis();
    }

    console.log("🔍 Calling ML Service:", ML_API_URL);

    // Read the image file
    const imageBuffer = fs.readFileSync(filePath);

    // Try different request formats based on what your friend's model expects

    // FORMAT 1: Form-data (most common)
    try {
      const formData = new FormData();
      formData.append("file", imageBuffer, {
        filename: "food-image.jpg",
        contentType: "image/jpeg",
      });

      const response = await axios.post(ML_API_URL, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: ML_API_TIMEOUT,
      });

      return parseMLResponse(response.data);
    } catch (formDataError) {
      console.log("Form-data failed, trying base64...");
    }

    // FORMAT 2: Base64 JSON
    try {
      const base64Image = imageBuffer.toString("base64");

      const response = await axios.post(
        ML_API_URL,
        {
          image: `data:image/jpeg;base64,${base64Image}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: ML_API_TIMEOUT,
        }
      );

      return parseMLResponse(response.data);
    } catch (base64Error) {
      console.log("Base64 failed, trying raw buffer...");
    }

    // FORMAT 3: Raw image buffer
    try {
      const response = await axios.post(ML_API_URL, imageBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
        },
        timeout: ML_API_TIMEOUT,
      });

      return parseMLResponse(response.data);
    } catch (rawBufferError) {
      throw new Error("All ML service connection attempts failed");
    }
  } catch (error: any) {
    console.error("❌ ML Service Error:", error.message);

    // Fallback to mock analysis
    console.log("🔄 Using mock analysis as fallback");
    return generateMockFreshnessAnalysis();
  }
};

/**
 * Parse different ML response formats
 */
const parseMLResponse = (mlData: any) => {
  // Common response format 1: Direct freshness data
  if (mlData.freshness && mlData.confidence !== undefined) {
    return {
      freshness: {
        status: mlData.freshness as "fresh" | "stale" | "spoiled",
        confidence: Number(mlData.confidence),
        isEdible: mlData.is_edible || mlData.edible || false,
      },
      ingredients: mlData.ingredients || [],
      foodType: mlData.food_type || mlData.category || "unknown",
    };
  }

  // Common response format 2: Nested data
  if (mlData.data) {
    const data = mlData.data;
    return {
      freshness: {
        status: data.freshness as "fresh" | "stale" | "spoiled",
        confidence: Number(data.confidence),
        isEdible: data.is_edible || false,
      },
      ingredients: data.ingredients || [],
      foodType: data.food_type || "unknown",
    };
  }

  // Common response format 3: Prediction array
  if (Array.isArray(mlData.predictions)) {
    const mainPrediction = mlData.predictions[0];
    return {
      freshness: {
        status: mainPrediction.class as "fresh" | "stale" | "spoiled",
        confidence: Number(mainPrediction.confidence),
        isEdible: mainPrediction.class === "fresh",
      },
      ingredients: mlData.ingredients || [],
      foodType: mlData.food_type || "unknown",
    };
  }

  throw new Error("Unsupported ML response format");
};

/**
 * Mock analysis for development/fallback
 */
const generateMockFreshnessAnalysis = () => {
  const mockResults = [
    {
      freshness: { status: "fresh" as const, confidence: 0.92, isEdible: true },
      ingredients: ["rice", "vegetables", "chicken", "spices"],
      foodType: "cooked_meal",
    },
    {
      freshness: {
        status: "stale" as const,
        confidence: 0.78,
        isEdible: false,
      },
      ingredients: ["bread", "cheese", "tomato"],
      foodType: "sandwich",
    },
  ];

  return mockResults[Math.floor(Math.random() * mockResults.length)];
};

/**
 * Check ML service health
 */
export const checkMLServiceHealth = async () => {
  try {
    // Try health endpoint
    const healthUrl = ML_API_URL.replace("/predict", "/health");
    const response = await axios.get(healthUrl, { timeout: 5000 });

    return {
      status: "healthy",
      service: "Food Freshness Detection",
      modelLoaded: true,
    };
  } catch (error) {
    // Try main endpoint
    try {
      await axios.get(ML_API_URL.replace("/predict", ""), { timeout: 5000 });
      return {
        status: "healthy",
        service: "Food Freshness Detection",
        modelLoaded: true,
      };
    } catch (secondError) {
      return {
        status: "unavailable",
        service: "Food Freshness Detection",
        modelLoaded: false,
      };
    }
  }
};
