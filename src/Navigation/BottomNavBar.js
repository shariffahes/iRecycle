import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapScreen from "../Screens/MapScreen";
import BlogScreen from "../Screens/BlogScreen";
import StoreScreen from "../Screens/StoreScreen";
import RequestScreen from "../Screens/RequestScreen";
import { Ionicons } from '@expo/vector-icons';

const BottomStack = createBottomTabNavigator();

const renderScreenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    switch(route.name){
      case 'Map': 
        return <MapIcon color={color} size={size}/>
      default:
        return <MapIcon color={color} size={size}/>
    }
  }
});

const MapIcon = ({size, color}) => {
  return <Ionicons size={size} name='map-outline' color={color}/>
};

const BottomNavBar = () => {
    return (
        <BottomStack.Navigator screenOptions={renderScreenOptions}>
            <BottomStack.Screen name="Map"component={MapScreen}/>
            <BottomStack.Screen name="Store" component={StoreScreen} />
            <BottomStack.Screen name="Request" component={RequestScreen} />
            <BottomStack.Screen name="Blog" component={BlogScreen} />
        </BottomStack.Navigator>
    );
};

const styles = StyleSheet.create({});
export default BottomNavBar;