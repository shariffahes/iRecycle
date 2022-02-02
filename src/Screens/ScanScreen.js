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


const ScanScreen = ({navigation}) => {
  const [hasCameraPermission, setCameraAccessPermission] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [ismodelDetecting, setmodelActivityStatus] = useState(false);
  const { model, isModelReady, error} = useModel();
  const camera = useRef(null);
  
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
      const newPredictions = await model.detect(imageTensor);
      setPredictions(newPredictions);
      setmodelActivityStatus(false);

    } catch (error) {
      console.log("Exception Error: ", error);
    }
  },[Image, setPredictions, imageToTensor, model]);

  const detectObject = useCallback(async () => {
    console.log('identify object pressed');
    setmodelActivityStatus(true);
    const response = await camera.current.takePictureAsync();
    const manipResponse = await ImageManipulator.manipulateAsync(
      response.uri,
      [{ resize: { width: 900 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    const source = { uri: manipResponse.uri };

    setPredictions(null);
    await classifyImageAsync(source);
  }, [camera, setPredictions, classifyImageAsync]);

  const onConfirm = useCallback((item) => {
    setPredictions(null);
    //move to next page
    const result = identifyWhichBin(item);
    console.log(result);
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
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={{ margin: 13 }}>
          <BackIcon />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <CustomText style={styles.textStyle}>Scan your object here</CustomText>
        <View style={styles.scanContainer}>
        </View>
        <ResultConfirmation predictions={predictions} onDetectObjectPressed={detectObject} loading={ismodelDetecting} onConfirm={onConfirm}/>
      </View>
    </Camera>
  );
};

const ResultConfirmation = ({ predictions, onDetectObjectPressed, onConfirm, loading}) => {
  const [isModalOpen, setModalStatus] = useState(false);
  const onModalCloseHandler = useCallback((name) => {
    setModalStatus(false);
    if(name !== "other") onConfirm(name);
  }, []);
  useEffect(() => {
    if (predictions && predictions.length > 1) setModalStatus(true);
  }, [predictions]);
  return (
    <View>
      {!predictions ? <CustomButton title='Detect Object' onPressHandler={onDetectObjectPressed} loading={loading}/>
                    : <>
                      {predictions.length == 1 && <SingleResult prediction={predictions[0]} onConfirm={onConfirm}/>}
                      <OptionsModal data={predictions} isOpen={isModalOpen} onClose={onModalCloseHandler}/>
                      </> 
                   }
    </View>
  );
};

const SingleResult = ({prediction, onConfirm}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', marginVertical: 15}}>
      <CustomText>Is this {prediction.class}</CustomText>
      <View style={styles.actionButtonsContainer}>
        <CustomButton title='yes' style={{ width: '40%' }} onPressHandler={onConfirm}/>
        <CustomButton title='No' style={{ width: '40%', backgroundColor: 'red' }} />
      </View>
    </View>);
}
const MultipleResult = (predictions, closeModal, isClosed) => {
  return (
    <Modal animated={true} visible={!closeModal} animationType="slide" onRequestClose={closeModal} transparent={true}>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <View style={{backgroundColor: 'red', height: 100, width: 200}}/>
      </View>
    </Modal>
    );
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