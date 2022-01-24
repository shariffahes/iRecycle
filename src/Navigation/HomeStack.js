import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MapScreen from "../Screens/MapScreen";
import ScanScreen from "../Screens/ScanScreen";

const MainStack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Main Map" component={MapScreen}/>
      <MainStack.Screen name="Scan" component={ScanScreen}/>
    </MainStack.Navigator>
  );
};

export default HomeStack;