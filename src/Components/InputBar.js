import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InputBar = ({
  keyboardType,
  placeholder,
  onChangeTextHandler,
  icon,
  secureTextBool,
  ...rest
}) => {
  return (
    <View style={styles.bar}>
      <Ionicons name={icon} style={styles.icon} />
      <TextInput
        keyboardType={keyboardType}
        onChangeText={onChangeTextHandler}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextBool}
        {...rest}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    padding: 10,
    width: 342,
    height: 52,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    marginLeft: 10,
    width: "80%",
    borderBottomColor: "grey",
    borderBottomWidth: 0.2,
  },
  icon: {
    fontSize: 30,
    color: "grey",
  },
});

export default InputBar;
