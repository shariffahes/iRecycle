import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import CustomText from "../Components/CustomUI/CustomText";
const CouponScreen = ({route, navigation}) => {
  const {logo, title, description, discount, otherRoute} = route.params;
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.mainPart}>
          <View>
            <Image
              style={styles.logo}
              source={{
                uri: logo,
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.description}>
            <CustomText
              color={"black"}
              bold={true}
              fontSize={30}
              style={{ marginBottom: 5 }}
            >
              {title}
            </CustomText>
            <CustomText
              color={"black"}
              fontSize={20}
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              {description}
            </CustomText>
            <CustomText color={"black"} bold={true} fontSize={23}>
              {discount}% Discount
            </CustomText>
          </View>
        </View>
        <View style={styles.hr}>
          <View style={[styles.circle, styles.circle1]}></View>
          <View style={styles.dottedContainer}>
            <Text style={styles.dotted}>- - - - - - - - - -</Text>
          </View>
          <View style={[styles.circle, styles.circle2]}></View>
        </View>
        <View style={styles.barcode}>
          <Image
            style={{ width: "75%", height: "90%" }}
            source={{
              uri: "https://barcode.tec-it.com/barcode.ashx?data=iRecycle&code=&translate-esc=true&dpi=100&imagetype=Png",
            }}
          ></Image>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: "90%",
    width: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
  },
  mainPart: {
    height: "70%",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  description: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  hr: {
    height: "10%",
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
  },
  barcode: {
    height: "20%",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "#f2f2f2",
    height: 45,
    width: 45,
    borderRadius: 25,
    position: "absolute",
  },
  circle1: {
    left: -25,
    top: 8,
    shadowColor: "grey",
    shadowOpacity: 0.15,
    shadowOffset: { width: 5, height: -2 },
    shadowRadius: 0.1,
  },
  circle2: {
    right: -25,
    top: 8,
    shadowColor: "grey",
    shadowOpacity: 0.15,
    shadowOffset: { width: -5, height: -2 },
    shadowRadius: 0.1,
  },
  dotted: {
    color: "grey",
    fontSize: 40,
    textAlign: "center",
  },
  dottedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
});
export default CouponScreen;
