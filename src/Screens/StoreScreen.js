import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import InfoCard from "../Components/InfoCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Store/Actions/products";
import ItemModal from "../Components/ItemModal";

const StoreScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const products = useSelector((state) => state.prod.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const closeDetails = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  const [selectedItemIndex, setItemIndex] = useState(null);

  const renderItem = ({ item, index }) => (
    <InfoCard
      title={item.title}
      coins={item.pointExchange}
      discount={item.discount}
      image={item.image}
      logo={item.logo}
      onPressHandler={() => {
        setModalVisible(true);
        setItemIndex(index);
      }}/>
  );

  return (
    <View style={styles.screen}>
        <FlatList
          style={styles.list}
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.prodId}
          numColumns={2}
        />
        {selectedItemIndex !== null ? (
          <ItemModal
            modalVisible={modalVisible}
            closeDetails={closeDetails}
            index={selectedItemIndex}
          />
        ) : null}
      </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  list: {
    flex:1,
    flexGrow:1,
    width: "100%",
  },
});
export default StoreScreen;
