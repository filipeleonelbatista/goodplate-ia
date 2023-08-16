import { Spinner, VStack } from "native-base";

export function Loading() {
  return (
    <VStack flex={1} alignItems="center" justifyContent="center">
      <Spinner color={"green.600"} size="lg" />
    </VStack>
  );
}
