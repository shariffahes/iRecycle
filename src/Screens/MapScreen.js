import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ScanButton from "../Components/ScanButton";
import * as Location from "expo-location";

const MapScreen = ({ navigation }) => {
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
    console.log(myLocation.coords.latitude);
  }

  return (
    <View style={styles.mainContainer}>
      <ScanButton
        onPressHandler={() => navigation.navigate("Scan")}
        style={styles.scanButton}
      />
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        maptype="hybrid"
        region={location}
      >
        <Marker
          coordinate={{
            latitude: 33.89291648510742,
            longitude: 35.47784753558452,
          }}
        />

        <Marker
          coordinate={{
            latitude: 33.8932688,
            longitude: 35.481416,
          }}
        />

        <Marker
          coordinate={{
            latitude: 33.893956,
            longitude: 35.4783872,
          }}
        />

        <Marker
          coordinate={{
            latitude: myLocation.coords.latitude,
            longitude: myLocation.coords.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scanButton: {
    position: "absolute",
    bottom: 30,
    right: 10,
  },
});
export default MapScreen;
