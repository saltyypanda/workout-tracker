import { View, Text, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Link } from "expo-router";

const width = Dimensions.get("window").width;

type Program = {
  id: number;
  title: string;
  description: string;
};

export default function ProgramCarouselScreen() {
  const db = useSQLiteContext();
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
      const fetchPrograms = async () => {
        const result = await db.getAllAsync("SELECT * FROM programs");
        const programsData = result as Program[];
        console.log("Fetched new programs:", programsData.length);
        setPrograms(programsData);
      };
      fetchPrograms();
    }, []);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      {programs.length > 0 && (
        <Carousel
          width={width * 0.9}
          height={300}
          data={programs}
          renderItem={({ item }) => (
            <View className="p-5 bg-secondary rounded-xl shadow-md h-full">
              <Text className="text-2xl text-content font-bold mb-2">
                {item.title}
              </Text>
              <Text className="text-base text-mutedcontent">
                {item.description}
              </Text>

              <Link href={`/programs/${item.id}`}>
                <View className="mt-4 bg-content rounded-lg p-3">
                  <Text className="text-secondary font-semibold text-center">
                    View Program
                  </Text>
                </View>
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