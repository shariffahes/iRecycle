import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, useWindowDimensions, Image, Modal } from "react-native";
import CardTitleText from "../Components/CustomUI/CardTitleText";
import CustomButton from "../Components/CustomUI/CustomButton";
import InputBar from "../Components/InputBar";
import Colors from "../constants/Colors";
import * as Crypto from "expo-crypto";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from 'react-redux';
import { signUp } from "../Store/Actions/auth";
import RightArrow from '../../assets/svg/RightArrow.svg';
import LeftArrow from '../../assets/svg/LeftArrow.svg';
import { baseFireBaseURL } from "../constants/Constants";
import BackIcon from '../../assets/svg/BackIcon.svg';
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setLoading] = useState(false);
  const [pageIndex, setIndex] = useState(0);
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('https://ik.imagekit.io/zdphhwaxuat/iRecycle/profiles/Avatars/nerd-guy_dh-UfLDnN?ik-sdk-version=javascript-1.4.3&updatedAt=1648401816086');
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");

  const setEmailHandler = (selectedEmail) => {
    setEmail(selectedEmail);
  };
  const onSubmit = useCallback(async () => {
    setLoading(true);
    if (password === confirmPassword) {
      const encryptedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );
      dispatch(signUp(email, encryptedPassword, fullName, avatar))
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
    }else{
      //Passwords did not match!
      setLoading(false);
      console.log('password difference');
    }
    
  }, [password]);
  const setPasswordHandler = (selectedPassword) => {
    setPassword(selectedPassword);
  };
  const setConfirmPasswordHandler = (selectedConfirmPassword) => {
    setConfirmPassword(selectedConfirmPassword);
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.screen}>
            <View style={styles.titleContainer}>
              <CardTitleText style={styles.title}>
                Become Part of The Change.
              </CardTitleText>
            </View>
         {pageIndex === 0 ? <FirstForm setConfirmPasswordHandler={setConfirmPasswordHandler} 
                              setEmailHandler={setEmailHandler} setPasswordHandler={setPasswordHandler} onNextPagePressed={() => {setIndex(1)}}
                              email={email} password={password} confirmPassword={confirmPassword}/>
                          : <SecondForm setFullName={setFullName} isLoading={isLoading}
                              onSubmit={onSubmit} goBack={() => setIndex(0)}
                              avatar={avatar} setAvatar={setAvatar} fullName={fullName}
                              navigation={navigation}/>}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const FirstForm = ({ email, password, confirmPassword, setEmailHandler, setPasswordHandler, setConfirmPasswordHandler, onNextPagePressed}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <InputBar icon="mail-outline" keyboardType="email-address" placeholder="Email" 
        autoCapitalize="none" onChangeTextHandler={setEmailHandler} value={email}/>
      <InputBar icon="lock-closed-outline" keyboardType="default" placeholder="Password" 
        secureTextBool={true} autoCapitalize="none" onChangeTextHandler={setPasswordHandler}
        value={password}/>
      <InputBar icon="lock-closed-outline" keyboardType="default" placeholder="Confirm Password" 
        secureTextBool={true} autoCapitalize="none" onChangeTextHandler={setConfirmPasswordHandler} value={confirmPassword}/>
      <TouchableOpacity style={{width: width, alignItems: 'flex-end', marginRight: 45}} onPress={onNextPagePressed}>
        <RightArrow height={35} width={35} />
      </TouchableOpacity>
    </View>
  );
};

const SecondForm = ({onSubmit, isLoading, setFullName, goBack, avatar, fullName, setAvatar, navigation}) => {
  const {width} = useWindowDimensions();
  
  return (
    <View style={{alignItems: 'center', justifyContent: 'center' }}>
      <View style={{height: 120, width: 120, borderRadius: 60}}>
        <TouchableWithoutFeedback 
          onPress={() => navigation.navigate('AvatarsScreen', {setAvatar: setAvatar})}>
          <Image source={{ uri: avatar }} resizeMode='cover' style={{ width: '100%', height: '100%'}}/>
        </TouchableWithoutFeedback>
      </View>
      <InputBar icon="person-outline" placeholder="Full Name"
        autoCapitalize="none" onChangeTextHandler={setFullName} value={fullName}/>
      <TouchableOpacity style={{ width: width, alignItems: 'flex-start', marginLeft: 45}}
        onPress={goBack}>
        <LeftArrow height={30} width={30} />
      </TouchableOpacity>
      <CustomButton
        title="Join Us!"
        style={styles.button}
        onPressHandler={onSubmit}
        loading={isLoading}/>
      <Text style={styles.quote}>Keep on Recycling!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
  },
  nextArrowStyle: {
    alignItems: 'flex-end'
  }, 
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "flex-start",
    width: "80%",
  },
  title: {
    fontSize: 25,
    justifyContent: "flex-start",
  },
  button: {
    width: 200,
    borderRadius: 40,
    height: 50,
    marginTop: 30,
  },
  quote: {
    fontSize: 10,
    color: Colors.green,
    fontStyle: "italic",
  },
});

export default SignUpScreen;
