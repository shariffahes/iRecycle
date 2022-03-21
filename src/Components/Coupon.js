import React, { useSelector } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import CustomText from "./CustomUI/CustomText";

const Coupon = ({ ...rest }) => {
  const arr = [
    {
      title: "Smoothies",
      coins: "200",
      expiryDate: "35",
      image:
        "https://img.freepik.com/free-psd/colorful-smoothies-green-background_23-2148237124.jpg?t=st=1647432634~exp=1647433234~hmac=350e876eb1f3ba7c8fcc118705dedecfd5f80c268d834a09c59774de99f2fea7&w=740",
    },
  ];
  return (
    <ImageBackground
      {...rest}
      style={styles.container}
      resizeMode="cover"
      imageStyle={{ borderRadius: 8 }}
      source={{ uri: arr[0].image }}
    >
      <CustomText color={"black"} fontSize={20}>{arr[0].title}</CustomText>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    width: 280,
    height: 150,
    borderRadius: 20,
    padding: 10,
    marginVertical:10
  },
});

export default Coupon;
