import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/TabNavigatorScreens/Home";
import Comentario from "../screens/TabNavigatorScreens/Comentarios";

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
        component={Comentario}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
