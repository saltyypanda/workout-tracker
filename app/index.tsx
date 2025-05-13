import { Link, RelativePathString } from "expo-router";
import { Pressable, ScrollView, Text, View, FlatList } from "react-native";
import { Image } from "expo-image";

export default function Index() {
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <ScrollView
      className="flex-1 bg-primary"
      contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
    >
      <Image
        source={require("@/assets/images/pixel-background.png")}
        contentFit="cover"
        style={{ width: "100%", height: "20%" }}
      />

      <View className="flex w-full justify-center items-center font-bold pt-8">
        <Text className="text-3xl text-content font-semibold">
          Workout Title
        </Text>
        <Text className="text-lg text-content p-5">
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </Text>
      </View>

      <View className="flex w-full p-5">
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

      <View className="flex w-full p-5">
        <Text className="text-xl text-content font-semibold">
          Start your workout!
        </Text>
      </View>

      {/* Weeks List */}
      <FlatList
        data={weeks}
        keyExtractor={(item) => `week-${item}`}
        scrollEnabled={false} // Let ScrollView handle scrolling
        className="w-full"
        renderItem={({ item }) => (
          <Link href={`/weeks/${item - 1}` as RelativePathString} asChild>
            <Pressable
              onPress={() => console.log(`Week ${item} pressed`)}
              className="w-full bg-secondary my-0.5 px-5 py-4"
            >
              <View className="flex flex-col w-full">
                <Text className="text-lg font-semibold text-content">
                  Week {item}
                </Text>
                <Text className="text-lg text-mutedcontent">0/7 Completed</Text>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </ScrollView>
  );
}
