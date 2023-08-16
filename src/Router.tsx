import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Plan } from "./screens/Plan";
import { Home } from "./screens/Home/Home";

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Plan" component={Plan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
