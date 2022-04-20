import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import CustomText from "../Components/CustomUI/CustomText";
import ProfileHeader from "../Components/ProfilerHeader";
import BannerVertical from "../Components/BannerVertical";
import { useDispatch, useSelector } from "react-redux";
import populateUserData from "../Store/Actions/user";
const ProfileScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.user);
  const arr = userData.coupons;
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
                    <BannerVertical
                      title={coupon.title}
                      discount={coupon.discount}
                      description={coupon.description}
                      logo={coupon.bgImageURL}
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
              <BannerVertical
                title={"Recycle Now!"}
                image={
                  "https://img.freepik.com/free-vector/flat-design-ecology-concept-with-natural-elements_23-2148219476.jpg?t=st=1647895379~exp=1647895979~hmac=352b7c86229d2acb244df05669459ae7231b04efdc7435fda5fd06e37b0deff5&w=740"
                }
                style={{ height: 300, width: 200 }}
              />
            </View>
            <View>
              <BannerVertical
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
