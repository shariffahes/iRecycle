import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const MenuScreen = ({ navigation }) => {
    return (
        <View>
            <Button title="User Profile" onPress={() => navigation.navigate("Auth")}/>
        </View>
    );
};

const styles = StyleSheet.create({});
export default MenuScreen;