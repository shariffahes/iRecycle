import React, { useSelector } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import CustomText from "./CustomUI/CustomText";

const Coupon = ({
  title,
  coins,
  expiryDate,
  discount,
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
      <Image
        source={{
          uri: logo,
        }}
        style={styles.logo}
        resizeMode="contain"

      />
      <View style={styles.hr}>
        <Text style={styles.dotted}>| | | |</Text>
      </View>
      <View style={styles.body}>
        <CustomText fontSize={20}>Enjoy</CustomText>
        <CustomText fontSize={25} bold={true}>
          {discount}%
        </CustomText>
        <CustomText fontSize={20}>Off!</CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.green,
    width: 250,
    height: 150,
    flex: 1,
    position: "relative",
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height:1 },
  },
  head: {
    width: 10,
    height: 150,
  },
  tail: {
    width: 10,
    height: 150,
  },
  circle: {
    backgroundColor: "#f2f2f2",
    height: 35,
    width: 35,
    borderRadius: 20,
    position: "absolute",
  },
  circle1: {
    left: -15,
    top: 55,
    shadowColor: "grey",
    shadowOpacity: 0.15,
    shadowOffset: { width: 5, height: -2 },
    shadowRadius: 0.1,
  },
  circle2: {
    right: -20,
    top: 55,
    shadowColor: "grey",
    shadowOpacity: 0.15,
    shadowOffset: { width: -5, height: -2 },
    shadowRadius: 0.1,
  },
  logo: {
    top:15,
    width: 110,
    height: 120,
  },
  hr: {
    width: 20,
    height: 150,
    position: "absolute",
    right: 85,
  },
  dotted: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
  },
  body: {
    width: 80,
    height: 150,
    justifyContent: "center",
    textAlign: "center",
  },
});

export default Coupon;
