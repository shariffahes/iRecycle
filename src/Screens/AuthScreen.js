import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CardTitleText from "../Components/CustomUI/CardTitleText";
import CustomButton from "../Components/CustomUI/CustomButton";
import InputBar from "../Components/InputBar";
import Colors from "../constants/Colors";
import AuthBanner from "../../assets/svg/AuthBanner";

const AuthScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setUsernameHandler = (selectedUsername) => {
    setUsername(selectedUsername);
  };

  const setPasswordHandler = (selectedPassword) => {
    setPassword(selectedPassword);
  };

  return (
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

        <CustomButton title="Log in" style={styles.button}></CustomButton>

        <Text style={styles.quote}>Keep on Recycling!</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
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
