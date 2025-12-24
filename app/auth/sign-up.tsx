import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { register } = useAuth();
  const router = useRouter();

  const submit = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword)
      return Alert.alert("Error", "All fields except phone are required.");

    if (form.password !== form.confirmPassword)
      return Alert.alert("Error", "Passwords do not match.");

    setIsSubmitting(true);

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      // 🚀 DIRECT REDIRECT TO HOME PAGE AFTER ACCOUNT CREATION
      router.replace("/(tabs)/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong.");
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
          Create an Account
        </Text>

        <Text className="text-base text-[#6b21a8] mb-6 text-center">
          Join LeftoverChef
        </Text>

        <CustomInput
          label="Full Name"
          value={form.name}
          onChangeText={(t) => setForm((p) => ({ ...p, name: t }))}
        />

        <CustomInput
          label="Phone (optional)"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(t) => setForm((p) => ({ ...p, phone: t }))}
        />

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

        <CustomInput
          label="Confirm Password"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={(t) => setForm((p) => ({ ...p, confirmPassword: t }))}
        />

        <CustomButton
          title="Create Account"
          isLoading={isSubmitting}
          onPress={submit}
        />

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Already have an account?</Text>
          <Link href="/auth/sign-in" className="text-[#ec4899] ml-1 font-bold">
            Sign In
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignUp;
