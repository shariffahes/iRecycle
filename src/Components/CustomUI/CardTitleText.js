import React from 'react';
import { StyleSheet, Text} from 'react-native';

const CardTitleText = ({ style, children, ...rest }) => {
    return <Text style={{...styles.customStyle, ...style}} {...rest}>{children}</Text>;
};

const styles = StyleSheet.create({
  customStyle: {
    fontFamily: 'roboto',
    fontSize: 22
  }
});
export default CardTitleText;