import React, { useState, useCallback, useMemo } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import CardTitleText from "../Components/CustomUI/CardTitleText";
import CustomButton from "../Components/CustomUI/CustomButton";
import InputBar from "../Components/InputBar";
import Colors from "../constants/Colors";
import * as Crypto from "expo-crypto";
import { useDispatch } from 'react-redux';
import { signUp } from "../Store/Actions/auth";
import UIProgressBar from "../Components/CustomUI/UIProgressBar";
import CustomText from "../Components/CustomUI/CustomText";
import { SvgUri } from "react-native-svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showError } from "../constants/CustomFts";

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setLoading] = useState(false);
  const [pageIndex, setIndex] = useState(0);
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('https://ik.imagekit.io/zdphhwaxuat/iRecycle/profiles/Avatars/Memoji-19.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1649586249615');
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
      showError("Confirmation password does not match the entered password.")
      console.log('password difference');
    }
    
  }, [password, confirmPassword, email, fullName, avatar]);
  const setPasswordHandler = (selectedPassword) => {
    setPassword(selectedPassword);
  };
  const setConfirmPasswordHandler = (selectedConfirmPassword) => {
    setConfirmPassword(selectedConfirmPassword);
  };

  return (
      <KeyboardAwareScrollView style={styles.container} extraHeight={-100}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.screen}>
            <View style={styles.titleContainer}>
              <CardTitleText style={styles.title}>
                Become Part of The Change.
              </CardTitleText>
              <UIProgressBar progressValue={(pageIndex + 1) * 0.5}/>
              <CustomText fontSize={14} style={{alignSelf: 'flex-end', marginBottom: 8}} color='#000'>Step {pageIndex + 1}</CustomText>
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
      </KeyboardAwareScrollView>
  );
};

const FirstForm = ({ email, password, confirmPassword, setEmailHandler, setPasswordHandler, setConfirmPasswordHandler, onNextPagePressed}) => {
  const isInputEmpty = useMemo(() => {
    return email.length == 0 || password.length == 0 || confirmPassword.length == 0
  }, [email, confirmPassword, password]);
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <InputBar icon="mail-outline" keyboardType="email-address" placeholder="Email" 
        autoCapitalize="none" onChangeTextHandler={setEmailHandler} value={email}/>
      <InputBar icon="lock-closed-outline" keyboardType="default" placeholder="Password" 
        secureTextBool={true} autoCapitalize="none" onChangeTextHandler={setPasswordHandler}
        value={password}/>
      <InputBar icon="lock-closed-outline" keyboardType="default" placeholder="Confirm Password" 
        secureTextBool={true} autoCapitalize="none" onChangeTextHandler={setConfirmPasswordHandler} value={confirmPassword}/>
      <CustomButton
        disabled={isInputEmpty}
        title="Next"
        style={styles.button}
        onPressHandler={onNextPagePressed}/>
    </View>
  );
};

const SecondForm = ({onSubmit, isLoading, setFullName, goBack, avatar, fullName, setAvatar, navigation}) => {  
  const onSetAvatarHandler = useCallback((avtr) => {
    setAvatar(avtr);
  }, [setAvatar])
  return (
    <View style={{alignItems: 'center', justifyContent: 'center' }}>
      <View style={{height: 120, width: 120, backgroundColor: '#bbb', borderRadius: 60, overflow: 'hidden'}}>
        <TouchableWithoutFeedback 
          style={{alignItems: 'center', justifyContent: 'center',}}
          onPress={() => navigation.navigate('AvatarsScreen', {setAvatar: onSetAvatarHandler})}>
          <SvgUri uri={avatar} width='100%' height='100%'/>
        </TouchableWithoutFeedback>
      </View>
      <InputBar icon="person-outline" placeholder="Full Name"
        autoCapitalize="none" onChangeTextHandler={setFullName} value={fullName}/>
      <View style={{flexDirection: 'row', justifyContent: 'center', width: '90%'}}>
        <CustomButton
          title="Back"
          style={[styles.button, {flex: 0.4, backgroundColor: 'black'}]}
          onPressHandler={goBack}/>
        <View style={{flex: 1 }}>
          <CustomButton
            title="Join Us!"
            style={[styles.button]}
            onPressHandler={onSubmit}
            loading={isLoading} disabled={fullName.length === 0} />
          <Text style={styles.quote}>Keep on Recycling!</Text>
        </View>
      </View>
      
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
    flexDirection: "column",
    marginTop: 20,
    justifyContent: "flex-start",
    width: "85%",
  },
  title: {
    fontSize: 25,
    justifyContent: "flex-start",
  },
  button: {
    width: 200,
    borderRadius: 40,
    height: 50,
    marginTop: 20,
  },
  quote: {
    fontSize: 10,
    color: Colors.green,
    fontStyle: "italic",
    alignSelf: 'center'
  },
});

export default SignUpScreen;
