import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import InputBar from "../Components/InputBar";

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
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
});
export default AuthScreen;
