import { Box, HStack, Text } from "native-base";

export type ItemProps = {
  name: string;
  percentage: string;
};

type Props = {
  data: ItemProps;
};

export function Item({ data }: Props) {
  return (
    <HStack
      w={"100%"}
      bgColor="white"
      borderRadius={4}
      alignItems="center"
      p={1}
      space={2}
    >
      <Box
        display="flex"
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        bgColor={"green.200"}
        h={44}
        w={44}
        borderRadius={4}
      >
        <Text color={"gray.900"} fontFamily={"Poppins_700Bold"} fontSize={14}>
          {data.percentage}
        </Text>
      </Box>

      <Text color={"gray.500"} fontFamily={"Poppins_400Regular"} fontSize={16}>
        {data.name}
      </Text>
    </HStack>
  );
}
