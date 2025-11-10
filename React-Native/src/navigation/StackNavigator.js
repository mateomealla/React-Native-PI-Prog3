import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import register from "../screens/StackNavigatorScreens/Register";
import login from "../screens/StackNavigatorScreens/Login";


import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={login} options={{headerShown: false}} />
      <Stack.Screen name="Register" component={register} options={{headerShown: false}} />
      
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}
