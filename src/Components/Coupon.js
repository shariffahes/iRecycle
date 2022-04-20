import React, { useSelector } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "./CustomUI/CustomText";

const Coupon = ({
  title,
  coins,
  expiryDate,
  discount,
  image,
  logo,
  description,
  style,
  onPressHandler,
  navigation,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Coupon", { logo, title, description, discount })
      }
    >
      <View style={styles.head}>
      <View style={[styles.circle, styles.circle1]}></View>

      </View>
      <View style={styles.logo}></View>
      <View style={styles.hr}></View>
      <View style={styles.body}></View>
      <View style={styles.tail}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    width: 250,
    height: 150,
    flex: 1,
    position: "relative",
    marginRight: 20,
    flexDirection: "row",
    justifyContent:"space-between"
  },
  head: {
    width: 40,
    height: 150,
    backgroundColor: "blue",
  },
  tail: {
    width: 40,
    height: 150,
    backgroundColor: "green",
  },
  circle: {
    backgroundColor: "#f2f2f2",
    height: 40,
    width: 40,
    borderRadius: 20,
    position: "absolute",
  },
  circle1: {
    left: -20,
    top: 55,
    shadowColor: "grey",
    shadowOpacity: 0.15,
    shadowOffset: { width: 5, height: -2 },
    shadowRadius: 0.1,
  },
  circle2: {
    right: -25,
    top: 8,
    shadowColor: "grey",
    shadowOpacity: 0.15,
    shadowOffset: { width: -5, height: -2 },
    shadowRadius: 0.1,
  },
});

export default Coupon;
