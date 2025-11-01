import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { cn } from "@/lib/utils"; // ✅ make sure you have this file created

interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
  style?: string; // since you’re using className (Tailwind)
  textStyle?: string;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
}

const CustomButton = ({
  onPress,
  title = "Click Me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn("custom-btn flex-row items-center justify-center", style)}
      disabled={isLoading}
    >
      {leftIcon && <View className="mr-2">{leftIcon}</View>}

      <View className="flex-row items-center justify-center">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className={cn("text-white text-base font-semibold", textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
