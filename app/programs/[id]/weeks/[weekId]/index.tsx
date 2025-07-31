import { Day, Week } from "@/utils/types";
import {
  Link,
  RelativePathString,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, Text, View, Image } from "react-native";

export default function WeekScreen() {
  const db = useSQLiteContext();
  const [week, setWeek] = useState<Week | null>(null);
  const [days, setDays] = useState<Day[] | null>(null);
  const { id, weekId } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWeekAndDays = async () => {
      const week = await db.getFirstAsync(
        "SELECT * FROM weeks WHERE id = $weekId",
        [weekId as string]
      );

      if (!week) {
        navigation.goBack(); // TODO: throw some error
        return;
      }

      setWeek(week as Week);

      const days = await db.getAllAsync(
        "SELECT * FROM days WHERE week_id = $id",
        { $id: weekId as string }
      );

      if (!days) {
        navigation.goBack(); // TODO: throw some error
        return;
      }

      setDays(days as Day[]);
    };

    fetchWeekAndDays();
  }, [id, weekId]);

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

      {days &&
        days.map((day) => (
          <Link
            key={`link_day_${day.day_number}`}
            href={
              `/programs/${id}/weeks/${weekId}/days/${day.day_number}` as RelativePathString
            }
            asChild
          >
            <Pressable
              className="flex flex-row justify-between items-center w-full bg-secondary my-0.5 px-5 py-4"
              key={`pressable_day_${day.day_number}`}
            >
              <View className="flex flex-col">
                <Text className="text-lg font-semibold text-content">
                  Day {day.day_number}: {day.title}
                </Text>
                <Text className="text-lg text-mutedcontent">60 minutes</Text>
              </View>
              <View className="flex flex-row gap-8 justify-end">
                {day.completed && (
                  <Image
                    source={require("@/assets/icons/check-circle.svg")}
                    style={{ width: 30, height: 30 }}
                  />
                )}
                <Image
                  source={require("@/assets/icons/chevron-right.svg")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            </Pressable>
          </Link>
        ))}
    </ScrollView>
  );
}
