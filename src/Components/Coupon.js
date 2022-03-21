import React, { useSelector } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import CustomText from "./CustomUI/CustomText";

const Coupon = ({ ...rest }) => {
  const arr = [
    {
      title: "Smoothies",
      coins: "200",
      expiryDate: "35",
      discount: "20",
      image:
        "https://img.freepik.com/free-psd/colorful-smoothies-green-background_23-2148237124.jpg?t=st=1647432634~exp=1647433234~hmac=350e876eb1f3ba7c8fcc118705dedecfd5f80c268d834a09c59774de99f2fea7&w=740",
    },
  ];
  return (
    <ImageBackground
      {...rest}
      style={styles.container}
      resizeMode="cover"
      imageStyle={{ borderRadius: 20 }}
      source={{ uri: arr[0].image }}
    >
      <View>
        <View style={styles.title}>
          <CustomText
            color={"black"}
            fontSize={30}
            bold={true}
            style={{ letterSpacing: 1.5 }}
          >
            {arr[0].title}
          </CustomText>
        </View>
        <CustomText>
          Enjoy <CustomText bold={true}>{arr[0].discount}%</CustomText> discount
          on {arr[0].title}!
        </CustomText>
      </View>
      <View>
        <CustomText bold={true} style={styles.expiry}>
          {arr[0].expiryDate} days left.
        </CustomText>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    width: 300,
    height: 150,
    padding: 10,
    marginVertical: 10,
    justifyContent:"space-between"
  },
  title: {
    backgroundColor: "#rgba(255,255,255,0.2)",
    marginVertical: 5,
  },
});

export default Coupon;
