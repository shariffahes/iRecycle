import React, { useCallback, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import CustomText from "./CustomUI/CustomText";
import CardTitleText from "./CustomUI/CardTitleText";
import CustomButton from "./CustomUI/CustomButton";
import CurrencyCoin from "./../../assets/svg/CurrencyCoin.svg";
import Logo from "../../assets/svg/Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { addCoupon } from "../Store/Actions/user";

const ItemModal = ({
  modalVisible,
  closeDetails,
  index
}) => {
  const product = useSelector((state) => state.prod.products[index]);
  const userPoints = useSelector(state => state.user.points);
  const dispatch = useDispatch();
  const canClaim = useMemo(() => userPoints >= product.pointExchange,[userPoints, product])
  const _onClaimHandler = useCallback(() => {
    dispatch(addCoupon(product.pointExchange, product.company, product.logo, product.title, product.description, product.discount));
    closeDetails();
  }, [dispatch, userPoints, product, addCoupon]);
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
              style={[styles.button, !canClaim && styles.disabledButton]} onPressHandler={_onClaimHandler} disabled={!canClaim}>
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
      <TouchableOpacity style={styles.screen} onPress={closeDetails}/>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "rgb(0,0,0)",
    opacity: 0,
    flex: 1,
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
  },
  disabledButton: {
    backgroundColor: 'grey'
  },
  centeredView: {
    zIndex: 10,
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
