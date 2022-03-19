import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ScanButton from "../Components/ScanButton";
import * as Location from "expo-location";
import YellowBinIcon from '../../assets/svg/YellowBin.svg';
import FilterView from "../Components/FilterView";
import { useDispatch, useSelector } from "react-redux";
import { PopulateData } from "../Store/Actions/RecyclePoints";
import BlueBin from '../../assets/svg/BlueBin.svg'
import VendingMachine from "../../assets/svg/VendingMachine.svg";
import RedBin from '../../assets/svg/RedBin.svg';
import GreenBin from "../../assets/svg/GreenBin.svg";

const MapScreen = ({ navigation, route }) => {
  const [materialType, setMaterialType] = useState(route.params?.materialType);
  const bin = useRef(null);
  const [shouldFilterOpen, setFilterStatus] = useState(null);
  const dispatch = useDispatch();
  const recycleAreas = useSelector(state => state.recycleAreas);
  //[VM, YB, RB, BB, GB]
  const [filterKey, setFilterKey] = useState([true, true, true, true, true]);
  useEffect( () => {
    dispatch(PopulateData());
  }, []);

  useEffect(() => {
    //when there are params, this means we are coming from the recycle result screen
    //so we should open filters
    setMaterialType(route.params?.materialType);
    bin.current = route.params?.bin;
    let filteredBins = [];
    //check the bin type and prevent the other bin type from rendering by setting to false
    //filter status is an array that includes the index of bin and the bin type which will 
    //be used in filterView for displaying name.
    switch(bin.current) {
      case 'Yellow':
        setFilterStatus([1, 'Yellow']);
        filteredBins = [true, true, false, false, false];
        break;
      case 'Red':
        setFilterStatus([2, 'Red']);
        filteredBins = [true, false, true, false, false];
        break;
      case 'Blue':
        setFilterStatus([3, 'Blue']);
        filteredBins = [true, false, false, true, false];
        break;
      case 'Green':
        setFilterStatus([4,'Green']);
        filteredBins = [true, false, false, false, true];
        break;
      default:
        setFilterStatus(null);
        filteredBins = [true, true, true, true, true];
      }
    setFilterKey(filteredBins);

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
      <FilterView setFilter={setFilterKey} filteredBin={shouldFilterOpen} setFilterOff={() => {
        setFilterStatus(null);
        setFilterKey([true, true, true, true, true]);
      }} materialType={materialType} filterKey={filterKey}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE} maptype="hybrid" region={location}>
        {filterKey[0] && recycleAreas.vendingMachines.map((VM, index) => 
          {  
            const coordinate = VM.coordinates;
            if(!coordinate.lat || !coordinate.lon) return;
            return (
              <Marker key={index} coordinate={{latitude: coordinate.lat, longitude: coordinate.lon}} title={VM.title} description={VM.description}>
                <VendingMachine height={45} width={45}/>
                {renderPointPreview(VM.title, VM.description)}
              </Marker>);
          })
        }  
        {filterKey[1] && recycleAreas.yellowBins.map((YBS, index) => {
            const coordinate = YBS.coordinates;
            return (
              <Marker key={index} coordinate={{ latitude: coordinate.lat, longitude: coordinate.lon }} title={YBS.title} description={YBS.description}>
                <YellowBinIcon height={35} width={35} />
                {renderPointPreview(YBS.title, YBS.description)}
              </Marker>);
          })
        }
        {filterKey[2] && recycleAreas.redBins.map((RBS, index) => 
          {  
            const coordinate = RBS.coordinates;
            return (
              <Marker key={index} coordinate={{latitude: coordinate.lat, longitude: coordinate.lon}} title={RBS.title} description={RBS.description}>
                <RedBin height={35} width={35}/>
                {renderPointPreview(RBS.title, RBS.description)}
              </Marker>);
          })
        }
        {filterKey[3] && recycleAreas.blueBins.map((BBS, index) => {
          const coordinate = BBS.coordinates;
          return (
            <Marker key={index} coordinate={{ latitude: coordinate.lat, longitude: coordinate.lon }} title={BBS.title} description={BBS.description}>
              <BlueBin height={35} width={35}/>
              {renderPointPreview(BBS.title, BBS.description)}
            </Marker>);
          })
        }
        {filterKey[4] && recycleAreas.greenBins.map((GBS, index) => {
          const coordinate = GBS.coordinates;
          return (
            <Marker key={index} coordinate={{ latitude: coordinate.lat, longitude: coordinate.lon }} title={GBS.title} description={GBS.description}>
              <GreenBin height={35} width={35}/>
              {renderPointPreview(GBS.title, GBS.description)}
            </Marker>);
          })
          }
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
            source={require("../../assets/icons/smoothies.png")}
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
