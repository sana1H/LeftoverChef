// import CustomButton from "@/components/CustomButton";
// import CustomInput from "@/components/CustomInput";
// import { Slot } from "expo-router";
// import React from "react";
// import {
//   Dimensions,
//   ImageBackground,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const Layout = () => {
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={{ flex: 1 }}
//       >
//         <ScrollView
//           className="bg-white h-full"
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ flexGrow: 1 }}
//         >
//           <View
//             className="w-full relative"
//             style={{ height: Dimensions.get("screen").height / 2.25 }}
//           >
//             <ImageBackground
//               source={require("../../assets/images/dish15.jpg")}
//               className="w-full h-full rounded-b-lg"
//               resizeMode="stretch"
//             />
//           </View>

//           {/* Render children routes */}
//           <Slot />
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default Layout;

// app/auth/_layout.tsx
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
