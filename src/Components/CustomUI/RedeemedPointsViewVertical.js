import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import CurrencyCoin from "../../../assets/svg/CurrencyCoin.svg";
import HDivider from "../../../assets/svg/HorizontalDivider.svg";
import CustomText from "./CustomText";
import Colors from "../../constants/Colors";

const RedeemedPointsViewVertical = ({onPressHandler, coins, discount }) => {
  return (
    <TouchableOpacity style={styles.mainContainer}  onPress={onPressHandler}>
      <View style={styles.coin}>
        <CurrencyCoin />
        <CustomText fontSize={18} bold={true}>{coins}</CustomText>
      </View>
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({ 
  mainContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.greenFaded,
    height: 40,
    width:60,
    borderRadius: 10,
    marginBottom: 3,
    marginRight: 3,
    marginTop:10,
    
  },
  coin:{
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center"
  }
});
export default RedeemedPointsViewVertical;
