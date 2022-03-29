import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTopTabs from "./MainTopTabs";
import MainScreen from "../Screens/MainScreen";
import AuthBanner from "../../assets/svg/AuthBanner";
import { StatusBar, SafeAreaView} from "react-native";
import AvatarsScreen from "../Screens/AvatarsScreen";

const AuthStack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="AuthScreen" component={MainTopTabs} options={{
        header: () => (
        <SafeAreaView style={{ alignItems: 'center', justifyContent: 'flex-start', backgroundColor: "#4d8d6e"}}>
          <StatusBar barStyle="light-content" backgroundColor="#4d8d6e"/>
          <AuthBanner />
        </SafeAreaView>)
      }}/>
      <AuthStack.Screen name="MainScreen" component={MainScreen}/>
      <AuthStack.Screen name="AvatarsScreen" component={AvatarsScreen}/>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;