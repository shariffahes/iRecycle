import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import CardTitleText from "../Components/CustomUI/CardTitleText";
import CustomButton from "../Components/CustomUI/CustomButton";
import InputBar from "../Components/InputBar";
import Colors from "../constants/Colors";
import AuthBanner from "../../assets/svg/AuthBanner";
import * as Crypto from "expo-crypto";

const AuthScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setUsernameHandler = (selectedUsername) => {
    setUsername(selectedUsername);
  };

  const onSubmit = useCallback(async () => {
    const encryptedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    //Dispatch to firebase
  }, [password]);

  const setPasswordHandler = (selectedPassword) => {
    setPassword(selectedPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.screen}>
          <AuthBanner></AuthBanner>
          <View style={styles.titleContainer}>
            <CardTitleText style={styles.title}>
              Log in your account.
            </CardTitleText>
          </View>
          <InputBar
            icon="mail-outline"
            keyboardType="email-address"
            placeholder="Email"
            onChangeTextHandler={setUsernameHandler}
          ></InputBar>

          <InputBar
            icon="lock-closed-outline"
            keyboardType="default"
            placeholder="Password"
            secureTextBool={true}
            onChangeTextHandler={setPasswordHandler}
          ></InputBar>

          <CustomButton
            title="Log in"
            style={styles.button}
            onPressHandler={onSubmit}
          ></CustomButton>

          <Text style={styles.quote}>Keep on Recycling!</Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
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
    width: "90%",
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
export default AuthScreen;
