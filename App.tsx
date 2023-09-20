import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { StatusBar } from "expo-status-bar";

import { Loading } from "./src/components/Loading";
import Router from "./src/Router";

import { NativeBaseProvider } from "native-base";

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });

  if (!fontsLoaded) {
    return (
      <NativeBaseProvider>
        <Loading />
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      <Router />
    </NativeBaseProvider>
  );
}
