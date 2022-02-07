import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import CardTitleText from "../Components/CustomUI/CardTitleText"
const InfoCard = ({
  title,
  coins,
  discount,
  website,
  image,
  section,
  ...rest
}) => {
  return (
    <View {...rest} style={styles.card}>
      <Image
        style={styles.image}
        source={require("../../assets/icons/vendingIcon.png")}
      />
      <View style={styles.info}>

        <CardTitleText>{title}</CardTitleText>
        <Text>{website}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    width: 384,
    height: 144,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 10 },
    alignItems: "center",
  },
  info: {
    flexDirection: "column",
    backgroundColor: "red",
    height: "100%",
    width: "100%",
    padding: 15,
    justifyContent:"space-between"
  },
  image: {
    width: "20%",
    height: "80%",
    marginHorizontal: 40,
  },
});

export default InfoCard;
