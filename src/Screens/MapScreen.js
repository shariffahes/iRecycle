import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MapScreen = ({ navigation }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Scan")}>
          <Text>Scan</Text>
        </TouchableOpacity>
      </View>
        );
};

const styles = StyleSheet.create({});
export default MapScreen;