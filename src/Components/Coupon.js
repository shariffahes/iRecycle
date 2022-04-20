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
      <Image
        source={{
          uri: "https://ik.imagekit.io/zdphhwaxuat/iRecycle/partners-logo/dunkin-donut.png?ik-sdk-version=javascript-1.4.3&updatedAt=1648115006661",
        }}
        style={styles.logo}
      ></Image>
      <View style={styles.hr}>
        <Text style={styles.dotted}>| | | |</Text>
      </View>
      <View style={styles.body}>
        <CustomText fontSize={30}>Enjoy</CustomText>
        <CustomText fontSize={35} bold={true}>
          20%
        </CustomText>
        <CustomText fontSize={30}>Off!</CustomText>
      </View>
      <View style={styles.tail}>
        <View style={[styles.circle, styles.circle2]}></View>
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
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
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
    right: -20,
    top: 55,
    shadowColor: "grey",
    shadowOpacity: 0.15,
    shadowOffset: { width: -5, height: -2 },
    shadowRadius: 0.1,
  },
  logo: {
    width: 110,
    height: 150,
  },
  hr: {
    width: 20,
    height: 150,
    position: "absolute",
    right: 100,
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
