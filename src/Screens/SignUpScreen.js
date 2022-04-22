import React, { useState, useCallback, useMemo } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
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
import { Entypo } from '@expo/vector-icons';
const digitPattern = new RegExp("(?=.*[0-9]+).*$");
const specialCharacterPattern = new RegExp("(?=[.*!@#$%^&*]+).*$");
const upperCasePattern = new RegExp("(?=.*[A-Z]+).*$");
const lowerCasePattern = new RegExp("(?=.*[a-z]).*$");

const validatePasswordPattern = (password) => {
  const pattern = [false, false, false, false, false];
  if (password.length >= 8) {
    pattern[0] = true;
  }
  if (password.match(digitPattern)) {
    pattern[1] = true;
  }
  if (password.match(specialCharacterPattern)) {
    pattern[2] = true;
  }
  if (password.match(upperCasePattern)) {
    pattern[3] = true;
  }
  if (password.match(lowerCasePattern)) {
    pattern[4] = true;
  }
  return pattern;
}
const passwordRules =  ["At least 8 characters in length", "Should include digit", "Should include special character", "Should include uppercase", "Should include lowercase"];
const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setLoading] = useState(false);
  const [pageIndex, setIndex] = useState(0);
  const [fullName, setFullName] = useState('');
  const [passwordPattern, setPasswordPatternValidation] = useState([false, false, false, false, false]);
  const canGoNext = useMemo(() => {
    const filtered = passwordPattern.filter(res => res === false);
    return filtered.length === 0;
  }, [passwordPattern]);
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
    const result = validatePasswordPattern(selectedPassword);
    setPasswordPatternValidation(result);
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
                              email={email} password={password} confirmPassword={confirmPassword} 
                              passwordPattern={passwordPattern} canGoNext={canGoNext}/>
                          : <SecondForm setFullName={setFullName} isLoading={isLoading}
                              onSubmit={onSubmit} goBack={() => setIndex(0)}
                              avatar={avatar} setAvatar={setAvatar} fullName={fullName}
                              navigation={navigation}/>}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
  );
};
const PasswordRulesText = ({rule, valid}) => {
  return (
    <View style={{flexDirection: 'row', margin: 3, alignItems: 'center'}}>
      <CustomText fontSize={12} color={valid ? 'green' : 'red'} style={{marginRight: 5}}>{rule}</CustomText>
      <Entypo size={14} name={valid ? "check" : "circle-with-cross"} color={valid ? "green" : "red"}/>
    </View>
  );
};

const FirstForm = ({ email, password, confirmPassword, setEmailHandler, setPasswordHandler, setConfirmPasswordHandler, onNextPagePressed, passwordPattern, canGoNext}) => {
  const isInputEmpty = useMemo(() => {
    return email.length == 0 || password.length == 0 || confirmPassword.length == 0
  }, [email, confirmPassword, password]);
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={{ alignSelf: 'flex-start' }}>
        <Text style={{marginLeft: 3, marginBottom: 5}}>Password Policy:</Text>
        {passwordRules.map((rule, index) => <PasswordRulesText key={index} rule={rule} valid={passwordPattern[index]} />)}
      </View>
      <InputBar icon="mail-outline" keyboardType="email-address" placeholder="Email" 
        autoCapitalize="none" onChangeTextHandler={setEmailHandler} value={email}/>
      <InputBar icon="lock-closed-outline" keyboardType="default" placeholder="Password" 
        secureTextBool={true} autoCapitalize="none" onChangeTextHandler={setPasswordHandler}
        value={password}/>
      <InputBar icon="lock-closed-outline" keyboardType="default" placeholder="Confirm Password" 
        secureTextBool={true} autoCapitalize="none" onChangeTextHandler={setConfirmPasswordHandler} value={confirmPassword}/>
      <CustomButton
        disabled={isInputEmpty || !canGoNext}
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
    marginBottom: 30,
  },
  quote: {
    fontSize: 10,
    color: Colors.green,
    fontStyle: "italic",
    alignSelf: 'center'
  },
});

export default SignUpScreen;
