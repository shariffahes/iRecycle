import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import HomeStack from "./HomeStack";
import BlogScreen from "../Screens/BlogScreen";
import StoreScreen from "../Screens/StoreScreen";
import RequestScreen from "../Screens/RequestScreen";
import { Ionicons, Entypo } from '@expo/vector-icons';
import MenuScreen from "../Screens/MenuScreen";

const BottomStack = createBottomTabNavigator();

const renderScreenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    switch(route.name){
      case 'Map': 
        return <MapIcon color={color} size={size}/>
      case "Store":
        return <StoreIcon color={color} size={size} />
      case 'Request':
        return <RequestIcon color={color} size={size} />
      case "Blog":
        return <BlogIcon color={color} size={size} />
      case "Menu":
        return <MenuIcon color={color} size={size} />
      default:
        return <Ionicons name="help-outline" color={color} size={size}/>
    }
  },
    tabBarActiveTintColor: '#4D8D6E',
    tabBarInactiveTintColor: '#AAA0A0'
});

const MapIcon = ({size, color}) => {
  return <Ionicons size={size} name="map-outline" color={color}/>
};
const StoreIcon = ({ size, color }) => {
    return <Entypo size={size} name="shop" color={color} />
};
const BlogIcon = ({ size, color }) => {
    return <Ionicons size={size} name="newspaper-outline" color={color} />
};
const RequestIcon = ({ size, color }) => {
    return <Entypo size={size} name="message" color={color} />
};
const MenuIcon = ({ size, color }) => {
  return <Entypo size={size} name="menu" color={color} />
};

const BottomNavBar = () => {
    return (
        <BottomStack.Navigator screenOptions={renderScreenOptions}>
            <BottomStack.Screen name="Map"component={HomeStack}
              options={{headerShown: false}}/>
            <BottomStack.Screen name="Store" component={StoreScreen} />
            <BottomStack.Screen name="Request" component={RequestScreen} />
            <BottomStack.Screen name="Blog" component={BlogScreen} />
            <BottomStack.Screen name="Menu" component={MenuScreen} />
        </BottomStack.Navigator>
    );
};

const styles = StyleSheet.create({});
export default BottomNavBar;