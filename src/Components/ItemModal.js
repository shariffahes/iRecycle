import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import CustomText from "./CustomUI/CustomText";
import CardTitleText from "./CustomUI/CardTitleText";
import CustomButton from "./CustomUI/CustomButton";
import CurrencyCoin from "./../../assets/svg/CurrencyCoin.svg";
import Colors from "../constants/Colors";
import Logo from "../../assets/svg/Logo.svg";
import { useSelector } from "react-redux";

const ItemModal = ({
  onPressHandler,
  modalVisible,
  closeDetails,
  index,
  ...rest
}) => {
  const product = useSelector((state) => state.prod.products[index]);
  // console.log(product)
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeDetails}
    >
      <View style={styles.centeredView}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: product.image,
            }}
          />
        </View>
        <View style={styles.desc}>
          <View style={styles.func}>
            <View style={{ alignItems: "flex-start" }}>
              <View style={{ position: "relative", left: -45 }}>
                <Logo height={27} />
              </View>
              <CardTitleText>{product.title}</CardTitleText>
            </View>
            <CustomButton
              title={`Claim For`}
              style={styles.button}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CustomText bold={true} style={{ marginHorizontal: 8 }}>
                  {product.pointExchange}
                </CustomText>
                <CurrencyCoin />
              </View>
            </CustomButton>
          </View>
          <View style={{ width: "85%" }}>
            <CustomText color={"grey"}>{product.description}</CustomText>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.screen}
        onPress={closeDetails}

      ></TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "rgba(0,0,0,0)",
    flex: 1,
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
  },
  centeredView: {
    zIndex: 100,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "white",
    height: "60%",
    borderTopLeftRadius:35,
    borderTopRightRadius:35,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 5,
    width: "100%",
  },
  button: {
    borderRadius: 30,
    width: 150,
    padding: 10,
    elevation: 2,
  },
  imageContainer: {
    height: "60%",
    width: "90%",
  },
  image: {
    flex: 1,
    width: "100%",
    borderRadius: 35,
  },
  desc: {
    alignItems: "center",
    width: "100%",
    marginBottom: 35,
  },
  func: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});

export default ItemModal;
