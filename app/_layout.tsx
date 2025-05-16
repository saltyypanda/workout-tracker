// app/_layout.tsx
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initDB } from "@/utils/db";
import "./globals.css";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="db" onInit={initDB}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#9B86A7",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerBackTitle: "Back",
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: true, title: "Workout Tracker" }}
        />
        <Stack.Screen
          name="programs/[programId]"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="programs/[id]"
          options={{ headerShown: true }}
        />
      </Stack>
    </SQLiteProvider>
  );
}
