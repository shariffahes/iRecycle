import React from "react";
import { View, StyleSheet } from 'react-native';
import Colors from "../../constants/Colors";

const UIProgressBar = ({progressValue}) => {
  return (
    <View style={styles.mainBar}>
        <View style={[styles.backgroundBar, {width: progressValue * 100 + '%'}]} />
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