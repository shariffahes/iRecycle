import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileHeader from "../Components/ProfilerHeader";

const ProfileScreen = () => {
  return (
    <View style={styles.screen}>
      <ProfileHeader name={"Sharif Fahes"}  points={"1000"}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
});
export default ProfileScreen;
