import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import CurrencyCoin from "../../../assets/svg/CurrencyCoin.svg";
import HDivider from "../../../assets/svg/HorizontalDivider.svg";
import CustomText from "./CustomText";
import Colors from "../../constants/Colors";

const RedeemedPointsViewVertical = ({ coins, discount }) => {
  return (
    <TouchableOpacity style={styles.mainContainer}>
      <View style={styles.coin}>
        <CurrencyCoin />
        <CustomText style={styles.font}>{coins}</CustomText>
      </View>
      <View style={{ paddingHorizontal: 7 }}>
        <HDivider />
      </View>
      <CustomText style={styles.font}>-{discount}%</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({ 
  mainContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.green,
    height: 85,
    borderRadius: 10,
    marginBottom: 3,
    marginRight: 3,
  },
  font: {
    fontSize: 20,
    fontFamily: "roboto-bold",
  },
  coin:{
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center"
  }
});
export default RedeemedPointsViewVertical;
