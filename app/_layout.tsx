import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9B86A7",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: true, title: "Workout Tracker" }} />
      <Stack.Screen name="weeks/[id]" options={{ headerShown: true }} />
    </Stack>
  );
}
