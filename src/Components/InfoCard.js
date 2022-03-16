import React from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import CustomText from "../Components/CustomUI/CustomText";
import RedeemedPointsViewVertical from "./CustomUI/RedeemedPointsViewVertical";
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
    <View {...rest} style={styles.card}>
      <ImageBackground
        style={styles.image}
        resizeMode="cover"
        source={require("../../assets/icons/smoothies.png")}
      >
        <View style={styles.redeemPointsContainer}>
        <RedeemedPointsViewVertical
          onPressHandler={onPressHandler}
          coins={coins}
          discount={discount}
        />
        </View>

        <View style={styles.bottom}>
          <View style={styles.info}>
            <CustomText>{title}</CustomText>
          </View>
        </View>
      </ImageBackground>
    </View>
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
  redeemPointsContainer:{
    width:"100%",
    flex:1,
    alignItems:"flex-end"
  },

  bottom: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8,
    height: "20%",
    alignItems: "center",
  },

  info: {
    opacity: 1,
  },

  image: {
    width: "100%",
    height: "100%",
    marginHorizontal: 40,
    justifyContent: "flex-end",
  },
});

export default InfoCard;
