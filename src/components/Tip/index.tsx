import { MaterialIcons } from "@expo/vector-icons";

import { HStack, Text } from "native-base";

type Props = {
  message: string;
};

export function Tip({ message }: Props) {
  return (
    <HStack
      w={"100%"}
      h={12}
      space={2}
      borderRadius={8}
      bgColor={"green.600"}
      alignItems="center"
      justifyContent="center"
    >
      <MaterialIcons name="restaurant" color="#FFFFFF" size={24} />

      <Text color={"white"} fontFamily={"Poppins_400Regular"} fontSize={16}>
        {message}
      </Text>
    </HStack>
  );
}
