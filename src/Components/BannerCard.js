import React from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import CardTitleText from "../Components/CustomUI/CardTitleText";
import RedeemedPointsViewVertical from "./CustomUI/RedeemedPointsViewVertical";

const BannerCard = ({ title, coins, discount, website, image, ...rest }) => {
  // Send image through prop not working!
  return (
    <View {...rest} style={styles.container}>
      <ImageBackground
        source={require("../../assets/icons/purseIcon.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.coins}>
          <RedeemedPointsViewVertical
            coins={coins}
            discount={discount}
          ></RedeemedPointsViewVertical>
        </View>
        <View style={styles.text}>
          <CardTitleText>{title}</CardTitleText>
          <Text>{website}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 384,
    height: 230,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 5 },
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  coins: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
export default BannerCard;
