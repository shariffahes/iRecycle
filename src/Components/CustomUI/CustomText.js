import React, { useMemo } from 'react';
import { StyleSheet, Text} from 'react-native';

const CustomText = ({ style, color, bold, fontSize, children, ...rest }) => {
  const dynamicStyles = useMemo(() => StyleSheet.create({
    textStyle: {
      fontFamily: bold ? 'roboto-bold' : 'roboto',
      color: color,
      fontSize: fontSize
    }
  }), [bold, color, fontSize])
    return (
    <Text style={{...dynamicStyles.textStyle, ...style}} {...rest}>
      {children}
    </Text>);
};

CustomText.defaultProps = {
  bold: false,
  color: '#fff',
  fontSize: 17
};

export default CustomText;