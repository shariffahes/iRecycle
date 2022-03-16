import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import CustomText from "../Components/CustomUI/CustomText";
import RedeemedPointsViewVertical from "./CustomUI/RedeemedPointsViewVertical";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const InfoCard = ({
  onPressHandler,
  title,
  coins,
  discount,
  image,
  section,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      style={styles.card}
      onPress={onPressHandler}
      activeOpacity="0.9"
    >
      <ImageBackground
        style={styles.image}
        resizeMode="cover"
        imageStyle={{ borderRadius: 8 }}
        source={require("../../assets/icons/smoothies.png")}
      >
        <View style={styles.redeemPointsContainer}>
          <RedeemedPointsViewVertical coins={coins} discount={discount} />
        </View>

        <View style={styles.bottom}>
          <View style={styles.info}>
            <CustomText>{title}</CustomText>
          </View>
          <View style={styles.cart}>
            <CustomText bold={true}>- {discount}%</CustomText>
            <Ionicons name="cart-outline" size={25} color={Colors.green} />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: "48%",
    height: "60%",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 5 },
    alignItems: "center",
    borderRadius: 8,
    margin: 10,
  },
  redeemPointsContainer: {
    width: "100%",
    flex: 1,
    alignItems: "flex-end",
  },

  bottom: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: "20%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  info: {
    opacity: 1,
    padding: 5,
  },

  image: {
    width: "100%",
    height: "100%",
    marginHorizontal: 40,
    justifyContent: "flex-end",
    borderRadius: 8,
  },
  cart: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
});

export default InfoCard;
