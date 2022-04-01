import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MenuScreen from "../Screens/MenuScreen";
import ProfileScreen from "../Screens/ProfileScreen"
import CouponScreen from "../Screens/CouponScreen"
import { renderHeaderOptions } from "../constants/CustomFts";

const OptionsStack = createNativeStackNavigator();

const MenuStack = () => {
  return (
    <OptionsStack.Navigator>
      <OptionsStack.Screen name="MainMenu" component={MenuScreen} options={renderHeaderOptions}/>
      <OptionsStack.Screen name="Profile" component={ProfileScreen} options={renderHeaderOptions}/>
      <OptionsStack.Screen name="Coupon" component={CouponScreen} options={renderHeaderOptions}/>
    </OptionsStack.Navigator>
  );
};

export default MenuStack;
