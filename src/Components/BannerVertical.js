import React, { useSelector } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "./CustomUI/CustomText";

const BannerVertical = ({
  title,
  coins,
  expiryDate,
  discount,
  image,
  logo,
  description,
  style,
  onPressHandler,
  navigation,
  ...rest
}) => {
  return (
    <TouchableOpacity>
      <ImageBackground
        style={[styles.container, style]}
        resizeMode="cover"
        imageStyle={{ borderRadius: 20 }}
        source={{ uri: image }}
        {...rest}
      >
        <View>
          <View style={styles.title}>
            <CustomText
              color={"black"}
              fontSize={25}
              bold={true}
              style={{ letterSpacing: 1.5 }}
            >
              {title}
            </CustomText>
          </View>
          {discount !== undefined ? (
            <CustomText>
              Enjoy <CustomText bold={true}>{discount}%</CustomText> discount on {title}!
            </CustomText>
          ) : null}
        </View>

      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    width: 280,
    height: 150,
    padding: 10,
    marginVertical: 10,
    justifyContent: "space-between",
    marginRight: 20,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 5, height: 3 },
  },
  title: {
    backgroundColor: "#rgba(255,255,255,0.15)",
    marginVertical: 5,
  },
});

export default BannerVertical;
