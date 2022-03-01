import { Camera } from "expo-camera";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View, ActivityIndicator, Modal, TouchableWithoutFeedback } from "react-native";
import { fetch } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import * as ImageManipulator from "expo-image-manipulator";
import * as jpeg from "jpeg-js";
import CustomText from "../Components/CustomUI/CustomText";
import CustomButton from '../Components/CustomUI/CustomButton';
import Colors from '../constants/Colors';
import { useModel } from '../contexts/ModelContext';
import { identifyWhichBin } from '../constants/CustomFts';
import OptionsModal from '../Components/CustomUI/OptionsModal';
import BackIcon from '../../assets/svg/BackIcon.svg';
import { materialTypes } from "../Data/materialsList";
import Toast from 'react-native-toast-message';

const ScanScreen = ({navigation}) => {
  const [hasCameraPermission, setCameraAccessPermission] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [ismodelDetecting, setmodelActivityStatus] = useState(false);
  const [isMaterialModalOpen, setMaterialModalStatus] = useState(false);
  const { model, isModelReady, error} = useModel();
  const camera = useRef(null);
  const imageURL = useRef(null);
  
  useEffect(async () => {
    const getPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraAccessPermission(status === "granted");
    }
    getPermission();
  }, []);
    
  const imageToTensor = useCallback((rawImageData) => {
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
  },[tf, jpeg]); 

  const classifyImageAsync = useCallback(async (source) => {
    try {
      const imageAssetPath = Image.resolveAssetSource(source);
      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
      const rawImageData = await response.arrayBuffer();
      const imageTensor = imageToTensor(rawImageData);
      const newPredictions = await model.classify(imageTensor, 1);
      console.log(newPredictions);
      if(newPredictions.length == 0) {
        setMaterialModalStatus(true);
      }
      setPredictions(newPredictions);
      const result = identifyWhichBin(newPredictions.className);
      Toast.show({
        type: 'recycleResult',
        position: 'bottom',
        autoHide: true,
        visibilityTime: 10000,
        bottomOffset: 100,
        props: { materialType: newPredictions[0].className, pointsValue: 20, binType: result, navigation: navigation }
      });
      setmodelActivityStatus(false);

    } catch (error) {
      console.log("Exception Error: ", error);
    }
  },[Image, setPredictions, imageToTensor, model]);

  const detectObject = useCallback(async () => {
    console.log('identify object pressed');
    setmodelActivityStatus(true);
    const res = await camera.current.takePictureAsync();
    imageURL.current = res.uri;
    const manipResponse = await ImageManipulator.manipulateAsync(
      res.uri,
      [{ resize: { width: 900 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    const source = { uri: manipResponse.uri };

    setPredictions(null);
    await classifyImageAsync(source);
  }, [camera, setPredictions, classifyImageAsync]);

  const onConfirm = useCallback((item, isMaterialPath) => {
    //move to next page
    const result = identifyWhichBin(item, isMaterialPath);
    if(result === "UNKNOWN") {
      setMaterialModalStatus(true);
      return;
    }
    setPredictions(null);
    navigation.navigate('Result', {imageURL: imageURL.current, result});
  },[]);


  if (!isModelReady) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size={33}/>
        </View>
      );
  }
  if (!hasCameraPermission || error) {
      console.log(hasCameraPermission);
      return <Text>No Camera Permission. {error}</Text>
  }

  return (
    <Camera ref={camera} style={styles.camContainer}>
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={{ position: 'absolute', left: 10, top: 10}}>
            <BackIcon />
          </View>
        </TouchableWithoutFeedback>
        <CustomText style={styles.textStyle}>Scan your object here</CustomText>
        <View style={styles.scanContainer}>
        </View>
        <CustomButton title='Detect Object' onPressHandler={detectObject} loading={ismodelDetecting} />
      </View>
    </Camera>
  );
};

const ResultConfirmation = ({ predictions, onDetectObjectPressed, onConfirm, loading, isMaterialModalOpen, setMaterialModalStatus}) => {
  const [isModalOpen, setModalStatus] = useState(false);
  const onModalCloseHandler = useCallback((name) => {
    setModalStatus(false);
    if(name !== "other") onConfirm(name);
    else setMaterialModalStatus(true);
  }, []);
  const onMaterialModalClose = useCallback((materialType) => {
    setMaterialModalStatus(false);
    onConfirm(materialType, true);
  }, []);
  const [multipleObjects, setObjects] = useState([]);
  useEffect(() => {
    if (predictions && predictions.length > 1) {
     const objcts = predictions.map(res => ({name: res.className}));
      setObjects([...objcts, {name: 'other'}]);
      setModalStatus(true);
    }
  }, [predictions]);
  return (
    <View>
      {!predictions ? <CustomButton title='Detect Object' onPressHandler={onDetectObjectPressed} loading={loading}/>
                    : <>
                      {predictions.length == 1 && <SingleResult prediction={predictions[0]} onConfirm={onConfirm} onReject={setMaterialModalStatus}/>}
                      <OptionsModal data={multipleObjects} isOpen={isModalOpen} onClose={onModalCloseHandler} title="Multiple Objects detected"/>
                       <OptionsModal data={materialTypes} isOpen={isMaterialModalOpen} onClose={onMaterialModalClose} title="Which material does this object made of ?"/>
                      </> 
                   }
    </View>
  );
};

const SingleResult = ({prediction, onConfirm, onReject}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', marginVertical: 15}}>
      <CustomText>Is this {prediction.className}</CustomText>
      <View style={styles.actionButtonsContainer}>
        <CustomButton title='yes' style={{ width: '40%' }} onPressHandler={() => onConfirm(prediction.class)}/>
        <CustomButton title='No' style={{ width: '40%', backgroundColor: 'red' }} 
          onPressHandler={() => onReject(true)} />
      </View>
    </View>);
}
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  camContainer: {
    flex: 1,
  },
  scanContainer: {
    marginTop: 30,
    borderColor: Colors.green,
    borderRadius: 22,
    borderWidth: 2,
    height: '70%',
    width: '95%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    opacity: 0.5
  },
  lowerPart: {

  },
  textStyle: {
    paddingTop: 10,
    fontSize: 15
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});
export default ScanScreen;