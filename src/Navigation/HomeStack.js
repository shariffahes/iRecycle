import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MapScreen from "../Screens/MapScreen";
import ScanScreen from "../Screens/ScanScreen";
import RecycleResultScreen from "../Screens/RecycleResultScreen";
import RecyclingScreen from "../Screens/RecyclingScreen";
import { renderHeaderOptions } from "../constants/CustomFts";


const MainStack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Main Map" component={MapScreen} options={renderHeaderOptions}/>
      <MainStack.Screen name="Scan" component={ScanScreen} options={renderHeaderOptions}/>
      <MainStack.Screen name="Result" component={RecycleResultScreen} options={{headerShown: false}}/>
      <MainStack.Screen name="Recycling" component={RecyclingScreen} options={renderHeaderOptions}/>
    </MainStack.Navigator>
  );
};

export default HomeStack;