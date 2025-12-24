// import CustomButton from "@/components/CustomButton";
// import CustomInput from "@/components/CustomInput";
// import { LinearGradient } from "expo-linear-gradient";
// import { Link } from "expo-router";
// import React, { useState } from "react";
// import { Alert, Text, View } from "react-native";
// import { useAuth } from "../context/AuthContext";

// const SignIn = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [form, setForm] = useState({ email: "", password: "" });
//   const { login } = useAuth();

//   const submit = async () => {
//     if (!form.email || !form.password) {
//       return Alert.alert("Error", "Email & password are required.");
//     }

//     setIsSubmitting(true);
//     try {
//       await login(form.email.trim(), form.password);
//     } catch (e) {
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <LinearGradient
//       colors={["#ffe6ff", "#f8d0ff", "#f0b8ff"]}
//       className="flex-1 justify-center px-5"
//     >
//       <View className="bg-white/95 rounded-3xl px-5 py-8 shadow-lg shadow-purple-300">
//         <Text className="text-3xl font-quicksand-bold text-[#7e22ce] mb-2">
//           Welcome Back
//         </Text>
//         <Text className="text-base text-[#6b21a8] mb-6">
//           Continue your journey with LeftoverChef
//         </Text>

//         <CustomInput
//           placeholder="you@example.com"
//           value={form.email}
//           label="Email"
//           onChangeText={(t) => setForm((p) => ({ ...p, email: t }))}
//           autoCapitalize="none"
//         />

//         <CustomInput
//           placeholder="Enter your password"
//           value={form.password}
//           label="Password"
//           secureTextEntry
//           onChangeText={(t) => setForm((p) => ({ ...p, password: t }))}
//         />

//         <CustomButton
//           title="Sign In"
//           isLoading={isSubmitting}
//           onPress={submit}
//         />

//         <View className="flex-row justify-center mt-6">
//           <Text className="text-gray-600">Don’t have an account?</Text>
//           <Link href="/auth/sign-up" className="text-[#ec4899] ml-1 font-bold">
//             Sign Up
//           </Link>
//         </View>
//       </View>
//     </LinearGradient>
//   );
// };

// export default SignIn;

// app/auth/sign-in.tsx
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const { login } = useAuth();
  const router = useRouter();

  const submit = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Error", "Email & password are required.");
    }

    setIsSubmitting(true);
    try {
      await login(form.email.trim(), form.password);

      // Redirect to Home
      router.replace("/(tabs)");
    } catch (e) {
      // already handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={["#ffe6ff", "#f8d0ff", "#f0b8ff"]}
      className="flex-1 justify-center px-5"
    >
      <View className="bg-white/95 rounded-3xl px-5 py-10 shadow-lg shadow-purple-300">
        <Text className="text-3xl font-quicksand-bold text-[#7e22ce] mb-2 text-center">
          Welcome Back
        </Text>

        <Text className="text-base text-[#6b21a8] mb-6 text-center">
          Sign in to continue
        </Text>

        <CustomInput
          label="Email"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(t) => setForm((p) => ({ ...p, email: t }))}
        />

        <CustomInput
          label="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(t) => setForm((p) => ({ ...p, password: t }))}
        />

        <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">New user?</Text>
          <Link href="/(tabs)/index" className="text-[#ec4899] ml-1 font-bold">
            Create account
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignIn;
