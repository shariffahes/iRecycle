import React, { useSelector } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import CustomText from "./CustomUI/CustomText";

const Coupon = ({ title, coins, expiryDate, discount, image, ...rest }) => {
  return (
    <ImageBackground
      {...rest}
      style={styles.container}
      resizeMode="cover"
      imageStyle={{ borderRadius: 20 }}
      source={{ uri: image }}
    >
      <View>
        <View style={styles.title}>
          <CustomText
            color={"black"}
            fontSize={30}
            bold={true}
            style={{ letterSpacing: 1.5 }}
          >
            {title}
          </CustomText>
        </View>
        <CustomText>
          Enjoy <CustomText bold={true}>{discount}%</CustomText> discount on{" "}
          {title}!
        </CustomText>
      </View>
      <View>
        <CustomText bold={true} style={styles.expiry}>
          {expiryDate} days left.
        </CustomText>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    width: 280,
    height: 150,
    padding: 10,
    marginVertical: 10,
    justifyContent: "space-between",
    marginRight: 20,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 5, height: 3 },
  },
  title: {
    backgroundColor: "#rgba(255,255,255,0.2)",
    marginVertical: 5,
  },
});

export default Coupon;
