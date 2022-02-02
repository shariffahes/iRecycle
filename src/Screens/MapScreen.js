import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
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
          title="LAU's Recycling Vending Machine"
          description="Now students can recycle easily and gain discounts from their favorite stores"
        >
          <Callout tooltip>
            <View>
              <View style={styles.markerBox}>
                <Text style={styles.markerName}>LAU's iRecycle</Text>
                <Text>
                  Now students can recycle easily and gain discounts from their
                  favorite stores
                </Text>
                <Image
                  style={styles.markerImage}
                  source={require("../../assets/icons/vendingIcon.png")}
                />
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </Marker>
        <Marker
          coordinate={{
            latitude: 33.8932688,
            longitude: 35.481416,
          }}
          title="Santona's Recycling Vending Machine"
          description="Residents are encouraged to recycle in order to gain disounts on their rents"
        >
          <Callout tooltip>
            <View>
              <View style={styles.markerBox}>
                <Text style={styles.markerName}>Santona's iRecycle</Text>
                <Text>
                  Residents are encouraged to recycle in order to gain disounts
                  on their rents
                </Text>
                <Image
                  style={styles.markerImage}
                  source={require("../../assets/icons/vendingIcon.png")}
                />
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </Marker>

        <Marker
          coordinate={{
            latitude: 33.893956,
            longitude: 35.4783872,
          }}
          title="Palm's Recycling Vending Machine"
          description="Residents are encouraged to recycle in order to gain disounts on their rents"
        >
          <Callout tooltip>
            <View>
              <View style={styles.markerBox}>
                <Text style={styles.markerName}>Palm's iRecycle</Text>
                <Text>
                  Residents are encouraged to recycle in order to gain disounts
                  on their rents
                </Text>
                <Image
                  style={styles.markerImage}
                  source={require("../../assets/icons/vendingIcon.png")}
                />
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </Marker>

        {/* <Marker
          coordinate={{
            latitude: myLocation.coords.latitude,
            longitude: myLocation.coords.longitude,
          }}
        /> */}
      </MapView>
      <ScanButton
        onPressHandler={() => navigation.navigate("Scan")}
        style={styles.scanButton}
      />
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
