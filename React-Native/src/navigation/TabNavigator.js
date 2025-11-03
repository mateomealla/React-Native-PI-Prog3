import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FontAwesome from '@expo/vector-icons/FontAwesome';

import Home from "../screens/TabNavigatorScreens/Home";
import New from "../screens/TabNavigatorScreens/Nueva-Publicacion";
import Profile from "../screens/TabNavigatorScreens/Profile";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />, headerShown: false}} />
      <Tab.Screen name="New" component={New} options={{tabBarIcon: () => <FontAwesome name="plus" size={24} color="black" />, headerShown: false}} />
      <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />, headerShown: false}} />
    </Tab.Navigator>
  );
}
