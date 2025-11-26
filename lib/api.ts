// lib/api.ts - Complete API Integration
import AsyncStorage from "@react-native-async-storage/async-storage";

// Change this to your backend URL

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api";
//const API_BASE_URL = "http://localhost:8000/api";
// For Android emulator use: 'http://10.0.2.2:8000/api'
// For iOS simulator use: 'http://localhost:8000/api'
// For physical device use: 'http://YOUR_LOCAL_IP:8000/api'

// Storage keys
const TOKEN_KEY = "@auth_token";

// Helper to get token
const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

// Helper to save token
export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// Helper to clear token
export const clearToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error clearing token:", error);
  }
};

// Generic API call helper
const apiCall = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
  requiresAuth: boolean = false
) => {
  const headers: any = {
    "Content-Type": "application/json",
  };

  if (requiresAuth) {
    const token = await getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

// ============================================
// AUTH APIs
// ============================================

export const authAPI = {
  register: async (name: string, email: string, password: string) => {
    const data = await apiCall("/auth/register", "POST", {
      name,
      email,
      password,
    });
    if (data.token) {
      await saveToken(data.token);
    }
    return data;
  },

  login: async (email: string, password: string) => {
    const data = await apiCall("/auth/login", "POST", { email, password });
    if (data.token) {
      await saveToken(data.token);
    }
    return data;
  },

  getMe: async () => {
    return await apiCall("/auth/me", "GET", null, true);
  },

  updateProfile: async (name?: string, email?: string) => {
    return await apiCall("/auth/profile", "PUT", { name, email }, true);
  },

  logout: async () => {
    await clearToken();
  },
};

// ============================================
// ML PREDICTION APIs
// ============================================

export const mlAPI = {
  predict: async (imageUri: string) => {
    const token = await getToken();
    if (!token) {
      throw new Error("Not authenticated");
    }

    const formData = new FormData();

    // Extract filename from URI
    const filename = imageUri.split("/").pop() || "photo.jpg";

    // Create file object for upload
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: filename,
    } as any);

    const response = await fetch(`${API_BASE_URL}/ml/predict`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type, let browser/fetch set it with boundary
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Prediction failed");
    }

    return data;
  },

  getSupportedFormats: async () => {
    return await apiCall("/ml/formats", "GET");
  },

  getHealth: async () => {
    return await apiCall("/ml/health", "GET");
  },
};

// ============================================
// HISTORY APIs
// ============================================

export const historyAPI = {
  getHistory: async (page?: number, limit?: number) => {
    const query = page && limit ? `?page=${page}&limit=${limit}` : "";
    return await apiCall(`/history${query}`, "GET", null, true);
  },

  getHistoryById: async (id: string) => {
    return await apiCall(`/history/${id}`, "GET", null, true);
  },

  deleteHistory: async (id: string) => {
    return await apiCall(`/history/${id}`, "DELETE", null, true);
  },

  getStats: async () => {
    return await apiCall("/history/stats", "GET", null, true);
  },

  clearAllHistory: async () => {
    return await apiCall("/history/clear-all", "DELETE", null, true);
  },
};

// ============================================
// EXPORT BASE URL for image URLs
// ============================================

export const getImageUrl = (imagePath: string) => {
  return `${API_BASE_URL.replace("/api", "")}${imagePath}`;
};

export { API_BASE_URL };


// ... rest of your api.ts code remains the same