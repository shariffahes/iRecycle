import React, { useState } from "react";
import { View, StyleSheet, Text, Modal, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import CustomText from "./CustomUI/CustomText";
import CardTitleText from "./CustomUI/CardTitleText";
import CustomButton from "./CustomUI/CustomButton";
import CurrencyCoin from "./../../assets/svg/CurrencyCoin.svg";
import Colors from "../constants/Colors";
import Logo from "../../assets/svg/Logo.svg"

const ItemModal = ({
  onPressHandler,
  title,
  coins,
  discount,
  image,
  modalVisible,
  closeDetails,
  ...rest
}) => {
  const { width } = useWindowDimensions();

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
              uri: "https://img.freepik.com/free-psd/fully-editable-green-juice-glass-bottle-mockup_1361-2500.jpg?t=st=1647432634~exp=1647433234~hmac=fcc485a1b233b041a016ab18e3c3dfe90b440dba27ee7adc454e1d17f3b4cd9b&w=826",
            }}
          />
        </View>
        <View style={styles.desc}>
          <View style={styles.func}>
            <View style={{alignItems:"flex-start"}}>
                <View style={{position:"relative", left:-45}}>
                <Logo height={27}/></View>
              <CardTitleText>Smoothies</CardTitleText>
            </View>
            <CustomButton title={`Claim For`} style={styles.button}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CustomText bold={true} style={{ marginHorizontal: 8 }}>
                  200
                </CustomText>
                <CurrencyCoin />
              </View>
            </CustomButton>
            {/* <Pressable style={styles.button} onPress={closeDetails}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable> */}
          </View>
          <View style={{ width: "85%" }}>
            <CustomText color={"grey"}>
              Smoothies is the smoothiest thing that a smoothie like you would
              smooth
            </CustomText>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "white",
    height: "60%",
    borderRadius: 35,
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
