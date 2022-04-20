import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import WasteCoins from '../../../assets/svg/WasteCoins.svg';
import HDivider from '../../../assets/svg/Divider.svg';
import CustomText from './CustomText';
import Colors from '../../constants/Colors';


const CollectedPoints = ({points, _onPress}) => {
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={_onPress}>
      <CustomText bold={true}>Points Collected</CustomText>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5}}>
        <WasteCoins />
        <View style={{ paddingHorizontal: 7 }}>
          <HDivider />
        </View>
        <CustomText style={styles.font}>{points}</CustomText>
      </View>
      <CustomText style={{marginTop: 10}} bold={true}>Press me when {'\n'} you are done :p</CustomText>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.green,
        borderRadius: 14,
        marginBottom: 3,
        padding: 20
    },
    font: {
        fontSize: 30,
        fontFamily: 'roboto-bold'
    }
});
export default CollectedPoints;