import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ScanScreen = () => {
    const [hasCameraPermission, setCameraAccessPermission] = useState(null);

    useEffect(() => {
        const getPermission = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setCameraAccessPermission(status === "granted");
        };
        getPermission();
    }, []);
    if (!hasCameraPermission) {
        return <Text>No Camera Permission</Text>
    }
    return (
        <Camera>
            <View style={{ height: '100%' }} />
        </Camera>
    );
};

const styles = StyleSheet.create({});
export default ScanScreen;