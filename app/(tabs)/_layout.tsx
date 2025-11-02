import { View, Image, ImageSourcePropType, Platform } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = ({
  focused,
  icon,
  iconName,
}: {
  focused: boolean;
  icon?: ImageSourcePropType;
  iconName?: keyof typeof Ionicons.glyphMap;
}) => {
  return (
    <View
      className={`flex items-center justify-center ${
        focused ? "bg-primary/10" : ""
      } rounded-full p-2`}
    >
      {icon ? (
        <Image
          source={icon}
          className="size-6"
          style={{ tintColor: focused ? "#FE8C00" : "#878787" }}
        />
      ) : (
        iconName && (
          <Ionicons
            name={iconName}
            size={24}
            color={focused ? "#FE8C00" : "#878787"}
          />
        )
      )}
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FE8C00",
        tabBarInactiveTintColor: "#878787",
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#f3f4f6",
          height: Platform.OS === "ios" ? 88 : 70,
          paddingBottom: Platform.OS === "ios" ? 24 : 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Quicksand-SemiBold",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="Upload"
        options={{
          title: "Upload",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="cloud-upload" />
          ),
        }}
      />
      <Tabs.Screen
        name="Alerts"
        options={{
          title: "Alerts",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="notifications" />
          ),
        }}
      />
      <Tabs.Screen
        name="Rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="gift" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="person" />
          ),
        }}
      />
    </Tabs>
  );
}
