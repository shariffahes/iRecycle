import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import BottomNavBar from "./BottomNavBar";

const MainNavigator = () => {
  return (
  <NavigationContainer>
    <BottomNavBar/>
  </NavigationContainer>);
};

const styles = StyleSheet.create({});
export default MainNavigator;