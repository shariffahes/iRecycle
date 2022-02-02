import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import WasteCoins from '../../../assets/svg/WasteCoins.svg';
import HDivider from '../../../assets/svg/Divider.svg';
import CustomText from './CustomText';
import Colors from '../../constants/Colors';

const RedeemedPointsView = () => {
  return (
    <TouchableOpacity style={styles.mainContainer}>
      <WasteCoins/>
      <View style={{paddingHorizontal: 7}}>
        <HDivider />
      </View>
      <CustomText style={styles.font}>22</CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: Colors.green,
    height: 40,
    borderRadius: 10,
    marginBottom: 3
  },
  font: {
    fontSize: 22,
      fontFamily: 'roboto-bold'
  }
});
export default RedeemedPointsView;