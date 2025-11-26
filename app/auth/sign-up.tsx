// import { View, Text, Alert } from "react-native";
// import React, { useState } from "react";
// import { Link, useRouter } from "expo-router";
// import CustomButton from "@/components/CustomButton";
// import CustomInput from "@/components/CustomInput";
// import { createUser } from "@/lib/appwrite";

// const SignUp = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const router = useRouter();

//   const submit = async () => {
//     const { name, email, password } = form;
//     if (!name || !email || !password) {
//       Alert.alert(
//         "Error",
//         "Please enter valid name, email address & password."
//       );
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       await createUser({ email, password, name });
//       Alert.alert("Success", "Account created successfully!");
//       router.replace("/");
//     } catch (error: any) {
//       Alert.alert("Error", error.message || "Something went wrong");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <View className="gap-10 bg-white rounded-lg p-5 mt-5">
//       <CustomInput
//         placeholder="Enter your name"
//         value={form.name}
//         onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
//         label="Name"
//       />
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
//       <CustomButton title="Sign-Up" isLoading={isSubmitting} onPress={submit} />

//       <View className="flex justify-center mt-5 flex-row gap-2">
//         <Text className="base-regular text-gray-600">
//           Already have an account?
//         </Text>
//         <Link href="/auth/sign-in" className="base-bold text-primary">
//           Sign In
//         </Link>
//       </View>
//     </View>
//   );
// };

// export default SignUp;


import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();
  const { register } = useAuth();

  const submit = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password) {
      Alert.alert(
        "Error",
        "Please enter valid name, email address & password."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await register(name, email, password);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/(tabs)");
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
          Create Account 🎉
        </Text>
        <Text className="text-base text-gray-600 font-quicksand">
          Join us in reducing food waste and helping communities
        </Text>
      </View>

      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Full Name"
        autoCapitalize="words"
      />
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CustomInput
        placeholder="Create a password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <CustomButton title="Sign Up" isLoading={isSubmitting} onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-600">
          Already have an account?
        </Text>
        <Link href="/auth/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;