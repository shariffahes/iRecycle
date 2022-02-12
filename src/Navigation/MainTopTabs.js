import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SignInScreen from "../Screens/SignInScreen";
import SignUpScreen from "../Screens/SignUpScreen";

const Tab = createMaterialTopTabNavigator();

const MainTopTabs = () => {
    return (
    <Tab.Navigator screenOptions={() => ({
      tabBarIndicatorStyle: {backgroundColor: '#4D8D6E'},
      tabBarActiveTintColor: '#4D8D6E',
      tabBarLabelStyle: {fontWeight: 'bold'}
    })}>
      <Tab.Screen name="Sign In" component={SignInScreen}/>
      <Tab.Screen name="Sign Up" component={SignUpScreen}/>
    </Tab.Navigator>
    );
};

export default MainTopTabs;