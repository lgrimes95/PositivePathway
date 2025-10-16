import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import FeelingScreen from "./screens/FeelingScreen";
import GameScreen from "./screens/GameScreen";
import PatternPathwaysScreen from "./screens/PatternPathwaysScreen";
import ActionPathScreen from "./screens/ActionPathScreen";
import ColorYourPathScreen from "./screens/ColorYourPathScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Feeling" component={FeelingScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="PatternPathways" component={PatternPathwaysScreen} />
        <Stack.Screen name="ActionPath" component={ActionPathScreen} />
        <Stack.Screen name="ColorYourPath" component={ColorYourPathScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
