import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Pressable, ScrollView, Text, View, Image } from "react-native";

export default function WeekScreen() {
  const { weekId } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    console.log("WeekScreen: ", weekId);
    navigation.setOptions({
      title: `Week ${weekId}`,
    });
  }, [navigation, weekId]);

  return (
    <ScrollView
      className="flex-1 bg-primary"
      contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
    >
      <View className="w-full p-5">
        <Text className="text-xl text-content font-semibold">
          Week {weekId}
        </Text>
      </View>

      {Array.from(
        { length: 7 },
        (_, i) => i + 1
      ).map((item) => (
        // <Link
        //   key={item}
        //   href={`/programs/${programId}/weeks/${item}` as RelativePathString}
        //   asChild
        // >
          <Pressable className="flex flex-row justify-between items-center w-full bg-secondary my-0.5 px-5 py-4" key={item}>
            <View className="flex flex-col">
              <Text className="text-lg font-semibold text-content">
                Day {item}
              </Text>
              <Text className="text-lg text-mutedcontent">60 minutes</Text>
            </View>
            <Image
              source={require("@/assets/icons/chevron-right.svg")}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>
        // </Link>
      ))}
    </ScrollView>
  );
}
