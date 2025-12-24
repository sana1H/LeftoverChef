import { Redirect } from "expo-router";
import React from "react";

export default function RootIndex() {
  // Always show home tabs; (tabs) is a group, so navigate to the group root
  return <Redirect href="/(tabs)" />;
}

