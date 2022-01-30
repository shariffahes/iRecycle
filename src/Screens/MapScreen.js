import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ScanButton from "../Components/ScanButton";

const MapScreen = ({ navigation }) => {
    return (
      <View style={styles.mainContainer}>
        <ScanButton onPressHandler={() => navigation.navigate("Scan")} style={styles.scanButton}/>
      </View>
        );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  scanButton: {
    position: 'absolute',
    bottom: 30,
    right: 10
  }
});
export default MapScreen;