// components/CustomButton.tsx
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
}

const CustomButton = ({
  title,
  onPress,
  isLoading = false,
  variant = "primary",
}: CustomButtonProps) => {
  if (variant === "primary") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isLoading}
        className="rounded-2xl overflow-hidden shadow-lg shadow-pink-300"
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#a855f7", "#ec4899"]}
          className="py-4 rounded-2xl items-center"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text className="text-white font-bold text-lg">{title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      className="border-2 border-[#a855f7] py-4 rounded-2xl items-center bg-white"
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color="#a855f7" size="small" />
      ) : (
        <Text className="text-[#7e22ce] font-bold text-lg">{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
