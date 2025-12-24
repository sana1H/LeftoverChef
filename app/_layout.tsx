// import { SplashScreen, Stack } from "expo-router";
// import "./globals.css";
// import { useFonts } from "expo-font";
// import { useEffect } from "react";
// import { GlobalProvider } from "@/context/GlobalProvider";

// // Keep splash screen visible while loading fonts
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [fontsLoaded, error] = useFonts({
//     "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
//     "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
//     "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
//     "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
//     "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
//   });

//   useEffect(() => {
//     if (error) throw error;
//     if (fontsLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded, error]);

//   if (!fontsLoaded) {
//     return null; // Keep showing splash screen
//   }

//   return (
//     <GlobalProvider>
//       <Stack screenOptions={{ headerShown: false }} />
//     </GlobalProvider>
//   );
// }


// app/_layout.tsx
import { AuthProvider } from "../app/context/AuthContext";
import AuthModal from "../components/AuthModel";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
      {/* AUTHMODAL MUST BE HERE */}
      <AuthModal />
    </AuthProvider>
  );
}