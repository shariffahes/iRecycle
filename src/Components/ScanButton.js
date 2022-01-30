import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const ScanButton = ({onPressHandler, ...rest}) => {
    return (
      <View {...rest}>
        <TouchableOpacity onPress={onPressHandler}>
          <Ionicons name='scan-circle' size={55} color={Colors.green}/>
        </TouchableOpacity>
      </View>
    );
};

export default ScanButton;