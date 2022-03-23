import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import AuthNavigator from "./AuthNavigator";
import BottomNavBar from "./BottomNavBar";
import {useSelector, useDispatch} from 'react-redux';
import { setData } from "../Store/Actions/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainNavigator = () => {
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const isTokenValid = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) return;
      const parsedData = JSON.parse(userData);
      const { token, userId, expiresIn } = parsedData;
      const expirationDuration = new Date(expiresIn);
      if (expirationDuration <= new Date() || !token || !userId) return;
      const currDate = new Date();
      const expireTime = expirationDuration.getTime() - currDate.getTime();
      dispatch(setData(token, userId, expireTime));
    };
    isTokenValid();

  }, [dispatch]);
  return (
  <NavigationContainer>
    {authState.token ? <BottomNavBar/> : <AuthNavigator/>}
  </NavigationContainer>);
};

const styles = StyleSheet.create({});
export default MainNavigator;