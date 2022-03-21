import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../Components/CustomUI/CustomText";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import CurrencyCoin from "./../../assets/svg/CurrencyCoin.svg";

const ProfileHeader = ({ name, points, ...rest }) => {
  return (
    <View style={styles.header} {...rest}>
      <View style={styles.profile}></View>
      <CustomText style={styles.name} color={"black"} fontSize={25}>
        {name}
      </CustomText>
      <View>
        <View style={styles.points}>
          <CustomText fontSize={15} bold={true}>
            {points} <CurrencyCoin />
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
    marginVertical: 20,
  },
  name: {
    letterSpacing: 1,
    marginVertical: 5,
  },
  points: {
    backgroundColor: Colors.green,
    padding: 5,
    borderRadius: 8,
  },
  profile: {
    width: 100,
    backgroundColor: Colors.green,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
});

export default ProfileHeader;
