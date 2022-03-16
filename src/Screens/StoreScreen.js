import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import BannerCard from "../Components/BannerCard";
import InfoCard from "../Components/InfoCard";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from "../Store/Actions/products";
import { addPoints, decrementPoints } from "../Store/Actions/user";

const StoreScreen = ({navigation}) => {
  const products = useSelector(state => state.prod.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch]);
  return (
    <View style={styles.screen}>

       <BannerCard
          title={"Hello World"}
          coins={250}
          discount={50}
          website={"helloworld.com"}
          image="../../assets/icons/purseIcon.jpg"
          // image sending not working
        ></BannerCard>

      <View >
        {/* <FlatList style={styles.list}> */}
        
        <InfoCard
          title={"Hello World"}
          coins={200}
          discount={20}
          image={"../../assets/icons/smoothies.png"}
          onPressHandler={() => navigation.navigate("Item")}
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

});
export default StoreScreen;
