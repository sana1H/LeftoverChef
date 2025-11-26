// import { View, Text, Alert } from "react-native";
// import React, { useState } from "react";
// import { Link, useRouter } from "expo-router";
// import CustomButton from "@/components/CustomButton";
// import CustomInput from "@/components/CustomInput";
// import { signIn } from "@/lib/appwrite";

// const SignIn = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [form, setForm] = useState({ email: "", password: "" });
//   const router = useRouter();

//   const submit = async () => {
//     if (!form.email || !form.password) {
//       return Alert.alert(
//         "Error",
//         "Please enter valid email address & password."
//       );
//     }

//     setIsSubmitting(true);

//     try {
//       await signIn({ email: form.email, password: form.password });
//       Alert.alert("Success", "User signed in successfully.", [
//         {
//           text: "OK",
//           onPress: () => router.replace("/"),
//         },
//       ]);
//     } catch (error: any) {
//       Alert.alert("Error", error.message || "Something went wrong");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <View className="gap-10 bg-white rounded-lg p-5 mt-5">
//       <View className="gap-2">
//         <Text className="text-2xl font-quicksand-bold text-dark-100">
//           Welcome Back! 👋
//         </Text>
//         <Text className="text-base text-gray-600 font-quicksand">
//           Sign in to continue sharing food and making a difference
//         </Text>
//       </View>

//       <CustomInput
//         placeholder="Enter your email"
//         value={form.email}
//         onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
//         label="Email"
//         keyboardType="email-address"
//       />
//       <CustomInput
//         placeholder="Enter your password"
//         value={form.password}
//         onChangeText={(text) =>
//           setForm((prev) => ({ ...prev, password: text }))
//         }
//         label="Password"
//         secureTextEntry={true}
//       />
//       <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />

//       <View className="flex justify-center mt-5 flex-row gap-2">
//         <Text className="base-regular text-gray-600">
//           Don't have an account?
//         </Text>
//         <Link href="/auth/sign-up" className="base-bold text-primary">
//           Sign Up
//         </Link>
//       </View>
//     </View>
//   );
// };

// export default SignIn;


import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const { login } = useAuth();

  const submit = async () => {
    if (!form.email || !form.password) {
      return Alert.alert(
        "Error",
        "Please enter valid email address & password."
      );
    }

    setIsSubmitting(true);

    try {
      await login(form.email, form.password);
      Alert.alert("Success", "User signed in successfully.", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)"),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <View className="gap-2">
        <Text className="text-2xl font-quicksand-bold text-dark-100">
          Welcome Back! 👋
        </Text>
        <Text className="text-base text-gray-600 font-quicksand">
          Sign in to continue sharing food and making a difference
        </Text>
      </View>

      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-600">
          Don't have an account?
        </Text>
        <Link href="/auth/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;