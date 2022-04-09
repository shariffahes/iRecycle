import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import CustomText from "./CustomText";

const CustomButton = ({ onPressHandler, title, style, loading, children, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPressHandler}
      style={[styles.buttonStyle, style]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.customContainer}>
          <CustomText bold={true} style={{marginHorizontal:8}}>{title}</CustomText>
          {children}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.green,
    borderRadius: 10,
    width: 200,
    margin: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  customContainer:{
    alignItems:"center",
  },
});
export default CustomButton;
