import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../Screens/AuthScreen";
import React from "react";
import MenuScreen from "../Screens/MenuScreen";
import { renderHeaderOptions } from "../constants/CustomFts";

const OptionsStack = createNativeStackNavigator();

const MenuStack = () => {
  return (
    <OptionsStack.Navigator>
      <OptionsStack.Screen name="MainMenu" component={MenuScreen} options={renderHeaderOptions}/>
      <OptionsStack.Screen name="Auth" component={AuthScreen} options={renderHeaderOptions}/>
    </OptionsStack.Navigator>
  );
};

export default MenuStack;
