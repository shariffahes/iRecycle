import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import AuthNavigator from "./AuthNavigator";
import BottomNavBar from "./BottomNavBar";

const MainNavigator = ({authenticated}) => {

  return (
  <NavigationContainer>
    {authenticated ? <BottomNavBar/> : <AuthNavigator/>}
  </NavigationContainer>);
};

const styles = StyleSheet.create({});
export default MainNavigator;