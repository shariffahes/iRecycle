import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import CustomText from './CustomText';

const CustomButton = ({ onPressHandler, title, style, loading }) => {
    return (
      <TouchableOpacity onPress={onPressHandler} style={[styles.buttonStyle, style]}>
        { loading ? <ActivityIndicator color='#fff'/> 
                  :
                    <CustomText bold={true}>{title}</CustomText>}
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
    }
});
export default CustomButton;