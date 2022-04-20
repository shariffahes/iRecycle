import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { renderHeaderOptions } from "../constants/CustomFts";
import ProfileScreen from "../Screens/ProfileScreen";
import CouponScreen from "../Screens/CouponScreen"

const ProfileS = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <ProfileS.Navigator>
      <ProfileS.Screen name="ProfileScreen" component={ProfileScreen} options={renderHeaderOptions} />
      <ProfileS.Screen  name="Coupon" component={CouponScreen} options={renderHeaderOptions} />
    </ProfileS.Navigator>);
};

export default ProfileStack;