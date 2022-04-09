import React from "react";
import { View, StyleSheet } from "react-native";
import CurrencyCoin from "../../../assets/svg/CurrencyCoin.svg";
import CustomText from "./CustomText";
import Colors from "../../constants/Colors";

const RedeemedPointsViewVertical = ({coins, discount }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.coin}>
        <CurrencyCoin />
        <CustomText style={{marginLeft: 4}} fontSize={15} bold={true}>{coins}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ 
  mainContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.greenFaded,
    height: 30,
    width:50,
    borderRadius: 8,
    marginBottom: 3,
    marginRight: 3,
    marginTop:10,
    padding: 7
  },
  coin:{
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center"
  }
});
export default RedeemedPointsViewVertical;
