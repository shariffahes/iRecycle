import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomText from "../Components/CustomUI/CustomText";
import ProfileHeader from "../Components/ProfilerHeader";
import Coupon from "../Components/Coupon"
const ProfileScreen = () => {
  return (
    <View style={styles.screen}>
      <ProfileHeader name={"Sharif Fahes"} points={"1000"} />
      <View style={styles.container}>
          <CustomText fontSize={24} bold={true} color={"black"}>Coupons</CustomText>
          <Coupon/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width:"90%",
  },
});
export default ProfileScreen;
