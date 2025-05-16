import { View, Text } from "react-native";

// I don't know if this can be used yet or if there's
// really a need to separate it into its own component

interface ContentRowProps {
  value: string;
  label: string;
}

export const ContentRow = (props: ContentRowProps) => {
  return (
    <View className="flex-1 items-center">
      <Text className="text-2xl font-bold text-content text-center">
        {props.value}
      </Text>
      <Text className="text-lg text-mutedcontent text-center">{props.label}</Text>
    </View>
  );
};
