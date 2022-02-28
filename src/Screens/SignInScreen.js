import React, { useState, useCallback, useEffect } from "react";
import {
    StyleSheet,
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
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from "../Store/Actions/auth";

const SignInScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);

    const setEmailHandler = (selectedEmail) => {
        setEmail(selectedEmail);
    };

    const onSubmit = useCallback(async () => {
      setLoading(true);
      const encryptedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );
      dispatch(logIn(email, encryptedPassword))
      .catch(error => {
        setLoading(false)
        console.log(error);
      });
      
    }, [email, password, dispatch]);

    const setPasswordHandler = (selectedPassword) => {
        setPassword(selectedPassword);
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
                            Log in your account.
                        </CardTitleText>
                    </View>
                    <InputBar
                        icon="mail-outline"
                        keyboardType="email-address"
                        placeholder="Email"
                        autoCapitalize="none"
                        onChangeTextHandler={setEmailHandler}
                    ></InputBar>

                    <InputBar
                        icon="lock-closed-outline"
                        keyboardType="default"
                        placeholder="Password"
                        secureTextBool={true}
                        autoCapitalize="none"
                        onChangeTextHandler={setPasswordHandler}
                    ></InputBar>

                    <CustomButton
                        title="Log in"
                        style={styles.button}
                        onPressHandler={onSubmit}
                        loading={isLoading}
                    />

                    <Text style={styles.quote}>Keep on Recycling!</Text>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
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
export default SignInScreen;
