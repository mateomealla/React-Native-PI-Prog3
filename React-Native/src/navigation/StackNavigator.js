import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/StackNavigatorScreens/Home";

import Pantalla2 from "../screens/StackNavigatorScreens/Pantalla2";
import Pantalla3 from "../screens/StackNavigatorScreens/Pantalla3";

import register from "../screens/session/Register";
import loogin from "../screens/session/Login";

import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={loogin} options={{headerShown: false}} />
      <Stack.Screen name="Register" component={register} options={{headerShown: false}} />


      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />

      <Stack.Screen name="Pantalla2" component={Pantalla2} options={{headerShown: false}} />
      <Stack.Screen name="Pantalla3" component={Pantalla3} options={{headerShown: false}} />
      
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}
