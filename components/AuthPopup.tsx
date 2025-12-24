import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useRouter } from "expo-router";

export default function AuthPopup({ visible, onClose }) {
  const router = useRouter();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            backgroundColor: "white",
            padding: 22,
            borderRadius: 18,
            elevation: 20,
          }}
        >
          <Text className="text-xl font-bold text-center mb-2">
            Login Required
          </Text>

          <Text className="text-center text-gray-600 mb-6">
            Please sign in to access this feature.
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/auth/sign-in")}
            style={{
              backgroundColor: "#a855f7",
              padding: 12,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text className="text-center text-white text-lg">Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/auth/sign-up")}
            style={{
              backgroundColor: "#ec4899",
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text className="text-center text-white text-lg">
              Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={{ marginTop: 12 }}>
            <Text className="text-center text-gray-500">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
