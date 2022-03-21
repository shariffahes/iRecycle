import React from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../Components/CustomUI/CustomButton";
import { useDispatch } from "react-redux";
import { Logout } from "../Store/Actions/auth";

const MenuScreen = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <View>
      <CustomButton
        onPressHandler={() => {
          navigation.navigate("Profile")
        }}
        title="Profile"
      />

      <CustomButton
        onPressHandler={() => {
          dispatch(Logout());
        }}
        title="Log out"
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default MenuScreen;
