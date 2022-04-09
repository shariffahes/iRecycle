import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import CustomText from "../Components/CustomUI/CustomText";
import RedeemedPointsViewVertical from "./CustomUI/RedeemedPointsViewVertical";

const InfoCard = ({
  onPressHandler,
  title,
  coins,
  discount,
  image,
  logo,
  section,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      style={styles.card}
      onPress={onPressHandler}
      activeOpacity="0.9">
      <View style={styles.headerInfo}>
        <Image source={{ uri: logo}} style={styles.icon}/>
        <View style={styles.redeemPointsContainer}>
          <RedeemedPointsViewVertical coins={coins} discount={discount} />
        </View>
      </View>
      <View style={styles.middleSection}>
        <Image source={{uri: image}} resizeMode='cover' style={styles.image}/>
      </View>
      <View style={styles.footerSection}>
        <CustomText color='#000' fontSize={16} bold={true}>{title}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex:1,
    backgroundColor: "white",
    width: "45%",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 5 },
    alignItems: "center",
    borderRadius: 12,
    height: 210,
    padding: 5,
    margin: 10,
  },
  redeemPointsContainer: {
    width: "100%",
    flex: 1,
    alignItems: "flex-end",
  },
  middleSection: {
    flex: 0.9,
    width: '100%',
    marginVertical: 5,
    padding: 5
  },
  icon: {
    height: 35,
    width: 50,
    backgroundColor: 'white',
    resizeMode: 'cover'
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default InfoCard;
