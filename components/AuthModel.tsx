// components/AuthModal.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../app/context/AuthContext"; // FIXED IMPORT PATH

const AuthModal = () => {
  const { showAuthModal, setShowAuthModal, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSignIn = () => {
    setShowAuthModal(false);
    router.push("/auth/sign-in");
  };

  const handleSignUp = () => {
    setShowAuthModal(false);
    router.push("/auth/sign-up");
  };

  // Don't show if user is authenticated or modal is not set to show
  if (isAuthenticated || !showAuthModal) {
    return null;
  }

  return (
    <Modal
      visible={showAuthModal}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setShowAuthModal(false)}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-3xl mx-5 p-6 w-11/12 max-w-sm">
          <View className="items-center mb-6">
            <Ionicons name="lock-closed" size={48} color="#7e22ce" />
            <Text className="text-2xl font-bold text-[#7e22ce] mt-2">
              Join LeftoverChef
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              Sign in to access all features and help reduce food waste!
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleSignIn}
            className="mb-4 rounded-2xl overflow-hidden"
          >
            <LinearGradient
              colors={["#a855f7", "#ec4899"]}
              className="py-4 rounded-2xl"
            >
              <Text className="text-white text-center font-bold text-lg">
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignUp}
            className="border-2 border-[#a855f7] py-4 rounded-2xl"
          >
            <Text className="text-[#7e22ce] text-center font-bold text-lg">
              Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowAuthModal(false)}
            className="mt-4"
          >
            <Text className="text-gray-500 text-center">Maybe later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AuthModal;
