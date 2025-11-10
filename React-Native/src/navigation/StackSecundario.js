import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/TabNavigatorScreens/Home";
import Comentarios from "../screens/TabNavigatorScreens/Comentarios";

import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comentario"
        component={Comentarios}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
