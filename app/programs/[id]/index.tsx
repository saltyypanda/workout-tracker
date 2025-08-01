import {
  Link,
  RelativePathString,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Pressable, ScrollView, Text, View, Image } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useLayoutEffect, useState } from "react";
import { Program, Week } from "@/utils/types";

export default function ProgramScreen() {
  const db = useSQLiteContext();
  const [program, setProgram] = useState<Program | null>(null);
  const [weeks, setWeeks] = useState<Week[] | null>(null);
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProgramAndWeeks = async () => {
      const program = await db.getFirstAsync(
        "SELECT * FROM programs WHERE id = $id",
        [id as string]
      );

      if (!program) {
        navigation.goBack(); // TODO: throw some error
        return;
      }

      setProgram(program as Program);

      const weeks = await db.getAllAsync(
        "SELECT * FROM weeks WHERE program_id = $id",
        { $id: id as string }
      );

      if (!weeks) {
        navigation.goBack(); // TODO: throw some error
        return;
      }

      setWeeks(weeks as Week[]);
    };

    fetchProgramAndWeeks();
  }, [id]);

  useLayoutEffect(() => {
    console.log("ProgramScreen: ", id);
    navigation.setOptions({
      title: "UPPERCASE PROGRAM TITLE",
    });
  }, [navigation, id, program]);

  return (
    <ScrollView
      className="flex-1 bg-primary"
      contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
    >
      <Image
        source={{ uri: program?.cover_uri }}
        style={{ width: "100%", height: 300 }}
        resizeMode="cover"
      />
      <View className="w-full justify-center items-center pt-8">
        <Text className="text-3xl text-content font-semibold">
          {program?.title}
        </Text>
        <Text className="text-lg text-content p-5 text-center">
          {program?.description}
        </Text>
      </View>

      <View className="w-full p-5">
        <Text className="text-xl text-content font-semibold">Progress</Text>
      </View>

      {/* Progress Cards */}
      {[
        [
          { label: "Time Spent", value: "00:00 hrs" },
          { label: "Completed", value: "0%" },
          { label: "Workouts", value: "0/56" },
        ],
        [
          { label: "Exercises", value: "0" },
          { label: "Sets", value: "0" },
          { label: "Reps", value: "0" },
        ],
      ].map((row, i) => (
        <View key={i} className="w-full bg-secondary my-1 px-5 py-4">
          <View className="flex-row w-full px-5">
            {row.map(({ label, value }, j) => (
              <View className="flex-1 items-center" key={j}>
                <Text className="text-2xl font-bold text-content text-center">
                  {value}
                </Text>
                <Text className="text-lg text-mutedcontent text-center">
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <View className="w-full p-5">
        <Text className="text-xl text-content font-semibold">
          Start your workout!
        </Text>
      </View>

      {weeks &&
        weeks.map((week) => (
          <Link
            key={`link_week_${week.week_number}`}
            href={`/programs/${id}/weeks/${week.id}` as RelativePathString}
            asChild
          >
            <Pressable className="flex flex-row justify-between items-center w-full bg-secondary my-0.5 px-5 py-4">
              <View className="flex flex-col">
                <Text className="text-lg font-semibold text-content">
                  Week {week.week_number}
                </Text>
                <Text className="text-lg text-mutedcontent">0/7 Completed</Text>
              </View>
              <View className="flex flex-row gap-8 justify-end">
                {week.completed &&
                  <Image
                  source={require("@/assets/icons/check-circle.svg")}
                  style={{ width: 30, height: 30 }}
                />
                }
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
