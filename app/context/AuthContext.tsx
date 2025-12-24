// context/AuthContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { authAPI } from "../../lib/api"; // ⭐ USE YOUR REAL BACKEND

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "donor" | "ngo" | "admin" | "delivery" | "user";
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (params: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

const TOKEN_KEY = "@auth_token";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ⭐ GLOBAL AUTH POPUP
  const [showAuthModal, setShowAuthModal] = useState(false);

  const router = useRouter();

  const getAuthToken = async () => {
    return await AsyncStorage.getItem(TOKEN_KEY);
  };

  const setAuthToken = async (value: string) => {
    await AsyncStorage.setItem(TOKEN_KEY, value);
    setToken(value);
  };

  const removeAuthToken = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  // ⭐ CHECK USER SESSION
  const checkAuth = async () => {
    try {
      const storedToken = await getAuthToken();
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      const me = await authAPI.getMe(storedToken);
      setUser(me.user);
      setToken(storedToken);
    } catch {
      await removeAuthToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // ⭐ LOGIN
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const data = await authAPI.login(email, password);

      if (!data.success || !data.token || !data.user)
        throw new Error("Login failed");

      await setAuthToken(data.token);
      setUser(data.user);
      setShowAuthModal(false);

      Alert.alert("Welcome!", `Hello ${data.user.name}!`, [
        {
          text: "Continue",
          onPress: () => router.replace("/(tabs)/"), // ⭐ FIXED REDIRECT
        },
      ]);
    } catch (err: any) {
      Alert.alert("Login Failed", err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ⭐ REGISTER → AUTO LOGIN
  const register = async (params: any) => {
    try {
      setIsLoading(true);

      const reg = await authAPI.register(params);
      if (!reg.success) throw new Error(reg.message);

      // ⭐ Auto Login
      const loginData = await authAPI.login(params.email, params.password);
      await setAuthToken(loginData.token);
      setUser(loginData.user);
      setShowAuthModal(false);

      Alert.alert("Welcome!", `${params.name}, your account is ready!`, [
        {
          text: "Continue",
          onPress: () => router.replace("/(tabs)/"), // ⭐ FIXED
        },
      ]);
    } catch (err: any) {
      Alert.alert("Signup Failed", err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await removeAuthToken();
    setUser(null);
    router.replace("/(tabs)/");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        register,
        logout,
        showAuthModal,
        setShowAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
