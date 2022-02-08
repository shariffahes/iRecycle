import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import BannerCard from "../Components/BannerCard";
import InfoCard from "../Components/InfoCard";

const StoreScreen = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <BannerCard
          title={"Hello World"}
          coins={250}
          discount={50}
          website={"helloworld.com"}
          image="../../assets/icons/purseIcon.jpg"
          // image sending not working
        ></BannerCard>

        {/* <FlatList style={styles.list}> */}
        
        <InfoCard
          title={"Hello World"}
          website={"helloworld.com"}
          coins={200}
          discount={20}
          image={"../../assets/icons/vendingIcon.png"}
        ></InfoCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  list: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
export default StoreScreen;
