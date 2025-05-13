import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

export default function WeekScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Week ${id}`,
    });
  }, [navigation, id]);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Text className="text-2xl font-bold text-content">Welcome to Week {id}</Text>
    </View>
  );
}
