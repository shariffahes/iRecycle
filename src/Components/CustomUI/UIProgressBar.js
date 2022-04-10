import React, {useEffect, useRef} from "react";
import { View, StyleSheet, Animated, useWindowDimensions} from 'react-native';
import Colors from "../../constants/Colors";

const UIProgressBar = ({progressValue}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const {width} = useWindowDimensions();
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progressValue * (width * 0.85),
      duration: 600,
      useNativeDriver: false
    }).start()
  }, [progressValue])
  return (
    <View style={styles.mainBar}>
        <Animated.View style={[styles.backgroundBar, {width: animatedValue}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainBar: {
    height: 7,
    backgroundColor: '#ddd',
    width: '100%',
    marginVertical: 12,
    borderRadius: 8,
    position: 'relative'
  },
  backgroundBar: {
    position: 'absolute',
    height: 7,
    backgroundColor: Colors.green,
    width: '50%',
    borderRadius: 8
  }
});
export default UIProgressBar;