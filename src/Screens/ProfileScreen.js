import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import CustomText from "../Components/CustomUI/CustomText";
import ProfileHeader from "../Components/ProfilerHeader";
import Coupon from "../Components/Coupon";
import { useDispatch, useSelector } from "react-redux";
import populateUserData from "../Store/Actions/user";
const ProfileScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.user);
  console.log("CCCC", userData.coupons);
  // console.log("------------")
  const arr = userData.coupons;
  // const arr = [
  //   {
  //     title: "Smoothies",
  //     coins: "200",
  //     expiryDate: "35",
  //     discount: "20",
  //     image:
  //       "https://img.freepik.com/free-psd/colorful-smoothies-green-background_23-2148237124.jpg?t=st=1647432634~exp=1647433234~hmac=350e876eb1f3ba7c8fcc118705dedecfd5f80c268d834a09c59774de99f2fea7&w=740",
  //   },
  //   {
  //     title: "Juice",
  //     coins: "100",
  //     expiryDate: "27",
  //     discount: "10",
  //     image:
  //       "https://img.freepik.com/free-psd/fully-editable-green-juice-glass-bottle-mockup_1361-2500.jpg?t=st=1647432634~exp=1647433234~hmac=fcc485a1b233b041a016ab18e3c3dfe90b440dba27ee7adc454e1d17f3b4cd9b&w=826",
  //   },
  // ];
  // console.log(arr)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <ProfileHeader
          name={userData.name}
          points={userData.accumulatedPoints}
          avatar={userData.avatar}
        />
        <View style={styles.container}>
          <CustomText fontSize={24} bold={true} color={"black"}>
            Coupons
          </CustomText>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {arr.map((coupon) => {
              if (coupon != null) {
                return (
                  <View>
                    <Coupon
                      title={coupon.title}
                      discount={coupon.discount}
                      image={"https://wallpaperaccess.com/full/1288346.jpg"}
                      navigation={navigation}
                    />
                  </View>
                );
              }
            })}
          </ScrollView>
          <CustomText
            fontSize={24}
            bold={true}
            color={"black"}
            style={{ marginTop: 30 }}
            showsHorizontalScrollIndicator={false}
          >
            Activities
          </CustomText>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 10 }}
          >
            <View>
              <Coupon
                title={"Recycle Now!"}
                image={
                  "https://img.freepik.com/free-vector/flat-design-ecology-concept-with-natural-elements_23-2148219476.jpg?t=st=1647895379~exp=1647895979~hmac=352b7c86229d2acb244df05669459ae7231b04efdc7435fda5fd06e37b0deff5&w=740"
                }
                style={{ height: 300, width: 200 }}
              />
            </View>
            <View>
              <Coupon
                title={"Volunteer With Us!"}
                image={
                  "https://img.freepik.com/free-vector/flat-design-ecology-concept-with-natural-elements_23-2148220332.jpg?t=st=1647896607~exp=1647897207~hmac=78ef9df72ebb24d83f1d9a5328beb990e6b5851a4fe40c36bd559b518e2e648e&w=740"
                }
                style={{ height: 300, width: 200 }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
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
