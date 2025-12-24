// components/CustomInput.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, View } from "react-native";

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  containerStyle?: string;
  icon?: string;
}

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  containerStyle = "",
  icon,
}: CustomInputProps) => {
  return (
    <View className={`mb-4 ${containerStyle}`}>
      <Text className="text-[#7e22ce] font-semibold mb-2 text-base">
        {label}
      </Text>
      <View className="flex-row items-center bg-white border-2 border-[#e9d5ff] rounded-2xl px-4 py-4 focus:border-[#a855f7]">
        {icon && (
          <Ionicons
            name={icon as any}
            size={20}
            color="#a855f7"
            style={{ marginRight: 12 }}
          />
        )}
        <TextInput
          className="flex-1 text-[#7e22ce] text-base"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#c4b5fd"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );
};

export default CustomInput;
