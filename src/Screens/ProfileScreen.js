import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import CustomText from "../Components/CustomUI/CustomText";
import ProfileHeader from "../Components/ProfilerHeader";
import Coupon from "../Components/Coupon";
const ProfileScreen = () => {
  const arr = [
    {
      title: "Smoothies",
      coins: "200",
      expiryDate: "35",
      discount: "20",
      image:
        "https://img.freepik.com/free-psd/colorful-smoothies-green-background_23-2148237124.jpg?t=st=1647432634~exp=1647433234~hmac=350e876eb1f3ba7c8fcc118705dedecfd5f80c268d834a09c59774de99f2fea7&w=740",
    },
    {
      title: "Juice",
      coins: "100",
      expiryDate: "27",
      discount: "10",
      image:
        "https://img.freepik.com/free-psd/fully-editable-green-juice-glass-bottle-mockup_1361-2500.jpg?t=st=1647432634~exp=1647433234~hmac=fcc485a1b233b041a016ab18e3c3dfe90b440dba27ee7adc454e1d17f3b4cd9b&w=826",
    },
  ];
  return (
    <View style={styles.screen}>
      <ProfileHeader name={"Sharif Fahes"} points={"1000"} />
      <View style={styles.container}>
        <CustomText fontSize={24} bold={true} color={"black"}>
          Coupons
        </CustomText>
        <ScrollView horizontal={true}>
          {arr.map((coupon) => {
            return (
              <View>
                <Coupon
                  title={coupon.title}
                  coins={coupon.coins}
                  expiryDate={coupon.expiryDate}
                  discount={coupon.discount}
                  image={coupon.image}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "90%",
  },
});
export default ProfileScreen;
