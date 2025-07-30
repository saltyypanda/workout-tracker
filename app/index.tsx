import { View, Text, Dimensions, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Link, RelativePathString } from "expo-router";
import { type Program } from "@/utils/types";

const { width, height } = Dimensions.get("window");

export default function ProgramCarouselScreen() {
  const db = useSQLiteContext();
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const result = await db.getAllAsync("SELECT * FROM programs LIMIT 10");
      const programsData = result as Program[];
      setPrograms(programsData);
    };
    fetchPrograms();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      {programs.length > 0 && (
        <Carousel
          width={width}
          height={height}
          data={programs}
          renderItem={({ item }) => (
            <View className="flex flex-col items-center justify-center gap-8 p-5 h-full">
              <Image
                source={{ uri: item.cover_uri }}
                style={{ width: "100%", height: 300 }}
                resizeMode="cover"
              />
              <Text className="text-4xl text-content font-bold mb-2 text-center">
                {item.title}
              </Text>
              <Text className="text-lg text-mutedcontent text-center">
                {item.description}
              </Text>

              <Link
                href={`/programs/${item.id}` as RelativePathString}
                className="mt-4 bg-secondary rounded-lg p-3 mx-auto w-3/4"
              >
                <Text className="text-xl text-content font-semibold text-center">
                  View Program
                </Text>
              </Link>
            </View>
          )}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          loop={false}
          autoPlay={false}
        />
      )}
    </View>
  );
}
