import { Stack } from "expo-router";
import "./globals.css";
import { SQLiteProvider } from "expo-sqlite";
import { initDB } from "@/utils/db";

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
          name="weeks/[id]"
          options={{ headerShown: true, title: "Week" }}
        />
      </Stack>
    </SQLiteProvider>
  );
}
