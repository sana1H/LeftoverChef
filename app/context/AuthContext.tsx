// context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  points: number;
  donationsCount: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get auth token from storage
  const getAuthToken = async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem("auth_token");
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  };

  // Set auth token in storage
  const setAuthToken = async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem("auth_token", token);
    } catch (error) {
      console.error("Error setting auth token:", error);
    }
  };

  // Remove auth token from storage
  const removeAuthToken = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("auth_token");
    } catch (error) {
      console.error("Error removing auth token:", error);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = async (): Promise<boolean> => {
    const token = await getAuthToken();
    return !!token;
  };

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const authenticated = await isAuthenticated();

      if (authenticated) {
        // Try to get user data from backend
        try {
          const token = await getAuthToken();
          const response = await fetch("http://localhost:8000/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setUser(data.data.user);
            } else {
              await logout();
            }
          } else {
            await logout();
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          await logout();
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.data.token) {
        await setAuthToken(data.data.token);
        setUser(data.data.user);
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success && data.data.token) {
        await setAuthToken(data.data.token);
        setUser(data.data.user);
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error: any) {
      throw new Error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await removeAuthToken();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
