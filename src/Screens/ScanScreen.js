import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as cocossd from "@tensorflow-models/coco-ssd";
import * as tf from '@tensorflow/tfjs';
import { fetch } from '@tensorflow/tfjs-react-native';
import * as ImageManipulator from "expo-image-manipulator";
import * as jpeg from "jpeg-js";


const ScanScreen = () => {
    const [hasCameraPermission, setCameraAccessPermission] = useState(null);
    const [isTFReady, setTFStatus] = useState(false);
    const [isModelReady, setModelStatus] = useState(false);
    const [predictions, setPredictions] = useState(null);
    const [imageToAnalyze, setImageToAnalyze] = useState(null);
    const model = useRef(null);
    const camera = useRef(null);
  
    useEffect(async () => {
      const getPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCameraAccessPermission(status === "granted");
      }
      const initializeTF = async () => {
        await tf.ready();
        console.log('done');
        setTFStatus(true);
      }
      const initializeModel = async () => {
        try{
        console.log("initializing model");
          model.current = await cocossd.load();
          setModelStatus(true);
        } catch(error) {
          console.error(error.toString());
        }
      }
      initializeTF();
      initializeModel();
      getPermission();

    }, []);
    
    const imageToTensor = (rawImageData) => {
        const { width, height, data } = jpeg.decode(rawImageData, {
            useTArray: true,
        }); // return as Uint8Array

        // Drop the alpha channel info for mobilenet
        const buffer = new Uint8Array(width * height * 3);
        let offset = 0; // offset into original data
        for (let i = 0; i < buffer.length; i += 3) {
            buffer[i] = data[offset];
            buffer[i + 1] = data[offset + 1];
            buffer[i + 2] = data[offset + 2];

            offset += 4;
        }

        return tf.tensor3d(buffer, [height, width, 3]);
    };

    const classifyImageAsync = async (source) => {
        try {
            const imageAssetPath = Image.resolveAssetSource(source);
            const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
            const rawImageData = await response.arrayBuffer();
            const imageTensor = imageToTensor(rawImageData);
            const newPredictions = await model.current.detect(imageTensor);
            setPredictions(newPredictions);
            console.log('predictions');
            console.log(newPredictions);
        } catch (error) {
            console.log("Exception Error: ", error);
        }
    };
    if(!isModelReady) {
        return <ActivityIndicator/>
    }
    if (!hasCameraPermission || !isModelReady) {
        return <Text>No Camera Permission</Text>
    }
    const identifyObject = async () => {
        console.log('ff');
        const response = await camera.current.takePictureAsync();
        const manipResponse = await ImageManipulator.manipulateAsync(
            response.uri,
            [{ resize: { width: 900 } }],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );

        const source = { uri: manipResponse.uri };
        setImageToAnalyze(source);
        setPredictions(null);
        await classifyImageAsync(source);
    };

    return (
      <Camera ref={camera}>
        <View style={{height: '70%'}}/>
        <Button onPress={() => {
            identifyObject();
        }} title="detect obj"/>
        <View style={{backgroundColor: '#fff'}}>
          {!predictions ? 
                          <Text>predicting...</Text>
                        : 
                          predictions.map((p) => <Text>
                                                  {p.class}: {p.score}
                                                 </Text>)}
        </View>
      </Camera>
    );
};

const styles = StyleSheet.create({});
export default ScanScreen;