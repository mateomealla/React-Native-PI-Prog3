import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FontAwesome from '@expo/vector-icons/FontAwesome';

import Feed from "../screens/TabNavigatorScreens/Feed";
import Buscador from "../screens/TabNavigatorScreens/Buscador";
import Usuario from "../screens/TabNavigatorScreens/Usuario";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} options={{tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />, headerShown: false}} />
      <Tab.Screen name="Buscador" component={Buscador} options={{tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />, headerShown: false}} />
      <Tab.Screen name="Usuario" component={Usuario} options={{tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />, headerShown: false}} />
    </Tab.Navigator>
  );
}
