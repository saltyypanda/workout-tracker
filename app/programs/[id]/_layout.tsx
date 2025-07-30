import { Stack } from "expo-router";

export default function WeekLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
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
