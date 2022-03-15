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
  const [filterKey, setFilterKey] = useState([true, true, true]);
  useEffect( () => {
    dispatch(PopulateData());
  }, []);

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
      <FilterView setFilter={setFilterKey} enabled={shouldFilterOpen} setFilterOff={() => {
        setFilterStatus(null);
        setFilterKey([true,true, true]);
      }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE} maptype="hybrid" region={location}>
        {filterKey[0] && recycleAreas.vendingMachines.map((VM, index) => 
          {  
            const coordinate = VM.coordinates;
            if(!coordinate.lat || !coordinate.lon) return;
            console.log(coordinate);
            return (
              <Marker key={index} coordinate={{latitude: coordinate.lat, longitude: coordinate.lon}} title={VM.title} description={VM.description}>
                <RecyclePointIcon/>
                {renderPointPreview(VM.title, VM.description)}
              </Marker>);
          })
        }  
          {filterKey[1] && recycleAreas.yellowBins.map((YBS, index) => 
          {  
            const coordinate = YBS.coordinates;
            return (
              <Marker key={index} coordinate={{latitude: coordinate.lat, longitude: coordinate.lon}}
                      title={YBS.title} description={YBS.description}>
                <YellowBinIcon/>
                {renderPointPreview(YBS.title, YBS.description)}
              </Marker>);
          })
        }
          {/*filterKey[2] && {recycleAreas.yellowBins.map((YBS, index) => {
            const coordinate = YBS.coordinates;
            return (
              <Marker key={index} coordinate={{ latitude: coordinate.lat, longitude: coordinate.lon }}
                title={YBS.title} description={YBS.description}>
                <ShoppingCenterIcon />
                {renderPointPreview(YBS.title, YBS.description)}
              </Marker>);
          })
          } */}
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
