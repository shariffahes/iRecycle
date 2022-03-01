import React, { useState, useEffect, useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ScanButton from "../Components/ScanButton";
import * as Location from "expo-location";
import YellowBinIcon from '../../assets/svg/YellowBin.svg';
import RecyclePointIcon from '../../assets/svg/RecyclePoint.svg';
import ShoppingCenterIcon from '../../assets/svg/ShoppingCenter.svg';
import FilterView from "../Components/FilterView";
import { useDispatch, useSelector } from "react-redux";
import { PopulateData } from "../Store/Actions/RecyclePoints";


const MapScreen = ({ navigation, route }) => {
  const materialType = useRef(route.params?.materialType);
  const [shouldFilterOpen, setFilterStatus] = useState(materialType);
  const dispatch = useDispatch();
  const recycleAreas = useSelector(state => state.recycleAreas);

  useEffect(() => {
    materialType.current = route.params?.materialType;
    setFilterStatus(materialType.current);
  },[route.params]);

  if(materialType) {
    //apply filters
  }
  const location = {
    latitude: 33.89653974328971,
    longitude: 35.479633221996096,
    latitudeDelta: 0.006,
    longitudeDelta: 0.02,
  };

  const [myLocation, setMyLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let myLocation = await Location.getCurrentPositionAsync({});
      setMyLocation(myLocation);
    })();
  }, []);

  if (errorMsg) {
    console.log(errorMsg);
  } else if (myLocation) {
    // console.log(myLocation.coords.latitude);
  }

  return (
    <View style={styles.mainContainer}>
      <FilterView enabled={shouldFilterOpen} setFilterOff={() => setFilterStatus(null)}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE} maptype="hybrid" region={location}>
        <Marker 
          coordinate={{
            latitude: 33.89291648510742,
            longitude: 35.47784753558452,
          }}
          title="LAU's Recycling Vending Machine"
          description="Now students can recycle easily and gain discounts from their favorite stores">
          <RecyclePointIcon/>
          {renderPointPreview("LAU's iRecycle", "Now students can recycle easily and gain discounts from their favorite stores")}
        </Marker>
        <Marker
          coordinate={{
            latitude: 33.8932688,
            longitude: 35.481416,
          }}
          title="Santona's Recycling Vending Machine"
          description="Residents are encouraged to recycle in order to gain disounts on their rents">
          <YellowBinIcon/>
          {renderPointPreview("Santona's iRecycle", "Residents are encouraged to recycle in order to gain disounts on their rents")}
        </Marker>
        <Marker
          coordinate={{
            latitude: 33.893956,
            longitude: 35.4783872,
          }}
          title="Palm's Recycling Vending Machine"
          description="Residents are encouraged to recycle in order to gain disounts on their rents"
        >
          <ShoppingCenterIcon/>
          {renderPointPreview("Palm's iRecycle", "Residents are encouraged to recycle in order to gain disounts on their rents")}
        </Marker>
      </MapView>
      <ScanButton
        onPressHandler={() => navigation.navigate("Scan")}
        style={styles.scanButton}
      />
      </FilterView>
    </View>
  );
};

const renderPointPreview = (name, description) => {
  return (
    <Callout tooltip>
      <View>
        <View style={styles.markerBox}>
          <Text style={styles.markerName}>{name}</Text>
          <Text>{description}</Text>
          <Image
            style={styles.markerImage}
            source={require("../../assets/icons/vendingIcon.png")}
            resizeMode='contain'
          />
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    </Callout>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scanButton: {
    position: "absolute",
    bottom: 30,
    right: 10,
  },
  markerBox: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  markerName: {
    fontSize: 16,
    marginBottom: 5,
  },
  markerImage: { width: "100%", height: 80 },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
});
export default MapScreen;
