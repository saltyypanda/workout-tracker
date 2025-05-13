import { Link, RelativePathString } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Image } from 'expo-image';

export default function Index() {
  return (
    <ScrollView
      className="flex-1 bg-primary py-10"
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Image
        source={require("@/assets/images/partial-react-logo.png")}
        contentFit="cover"
        style={{
          width: "100%",
          height: "30%",
        }}
      />
      <View className="flex w-full p-5">
        <Text className="text-xl text-content font-semibold">
          Start your workout!
        </Text>
      </View>

      {Array.from({ length: 12 }, (_, i) => (
        <Link key={i} href={`/weeks/${i}` as RelativePathString} asChild>
          <Pressable
            onPress={() => console.log(`Week ${i + 1} pressed`)}
            className="w-full justify-center bg-secondary my-0.5 px-5 py-4"
            key={i}
          >
            <View className="flex flex-col w-full">
              <Text className="text-lg font-semibold text-content">
                Week {i + 1}
              </Text>
              <Text className="text-lg text-mutedcontent">7/7 Completed</Text>
            </View>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}
