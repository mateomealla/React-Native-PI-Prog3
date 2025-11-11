import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FontAwesome from '@expo/vector-icons/FontAwesome';

import New from "../screens/TabNavigatorScreens/creacionposteo";
import Profile from "../screens/TabNavigatorScreens/Profile";

import StackSecundario from "./StackSecundario";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={StackSecundario} options={{tabBarIcon: () => <FontAwesome name="home" size={24} color="#1679FF" />, headerShown: false}} />
      <Tab.Screen name="New" component={New} options={{tabBarIcon: () => <FontAwesome name="plus" size={24} color="#1679FF" />, headerShown: false}} />
      <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => <FontAwesome name="user" size={24} color="#1679FF" />, headerShown: false}} />

    </Tab.Navigator>
  );
}
