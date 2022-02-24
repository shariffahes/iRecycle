import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import CustomText from './CustomText';

const CustomButton = ({ onPressHandler, title, style, loading }) => {
  console.log(loading);
    return (
      <TouchableOpacity onPress={onPressHandler} style={[styles.buttonStyle, style]}>
        { loading ? <ActivityIndicator color='#fff'/> 
                  :
                    <CustomText style={styles.buttonTitle}>{title}</CustomText>}
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
      backgroundColor: Colors.green,
      borderRadius: 10,
      width: 200,
      margin: 10,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonTitle: {
      color: '#fff',
      fontFamily: 'roboto-bold'
    }
});
export default CustomButton;