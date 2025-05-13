// app/programs/[id]/_layout.tsx
import { Stack } from "expo-router";

export default function ProgramLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#9B86A7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerBackTitle: "Back",
      }}
    />
  );
}
