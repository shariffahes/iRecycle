import React from 'react';
import { StyleSheet, Text} from 'react-native';

const CustomText = ({ style, children, ...rest }) => {
    return <Text style={{...styles.customStyle, ...style}} {...rest}>{children}</Text>;
};

const styles = StyleSheet.create({
  customStyle: {
    fontFamily: 'roboto',
    color: '#fff',
    fontSize: 17
  }
});
export default CustomText;