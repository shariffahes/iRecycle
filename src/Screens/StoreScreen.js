import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import InfoCard from "../Components/InfoCard";

const StoreScreen = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        {/* <FlatList style={styles.list}> */}
        <InfoCard title={"Hello World"} website={"helloworld.com"}></InfoCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor:"#F5F5F5"
  },
  list: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
export default StoreScreen;
