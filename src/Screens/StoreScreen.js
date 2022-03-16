import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import BannerCard from "../Components/BannerCard";
import InfoCard from "../Components/InfoCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Store/Actions/products";
import { addPoints, decrementPoints } from "../Store/Actions/user";
import Colors from "../constants/Colors";
import { diffClamp } from "react-native-reanimated";


const StoreScreen = ({ navigation }) => {
  const products = useSelector((state) => state.prod.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(products[1])
  
  const renderItem = ({ item }) => (
    <InfoCard
      title={item.title}
      coins={item.pointExchange}
      discount={item.discount}
      image={item.image}
      onPressHandler={() => navigation.navigate("Item")}
    ></InfoCard>
  );

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

        <FlatList
          style={styles.list}
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.prodId}
          numColumns={2}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  list:{
    width:"100%",
  }
});
export default StoreScreen;
