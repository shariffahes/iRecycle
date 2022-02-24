import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import CustomText from './CustomText';
import CircleNavIcon  from '../../../assets/svg/circular-navigate.svg';
const RecycleResultToast = () => {
 
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#4d8d6e', height: 50, width: 50, borderRadius: 12, marginHorizontal: 10}}>
       
      </View>
      <View style={{marginHorizontal: 8}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CustomText bold={true}>A can</CustomText>
          <View style={{flexDirection: 'row', paddingLeft: 5}}>
            <CustomText fontWeight='400' color='#000'>20 </CustomText>
            <CustomText color='grey' >points</CustomText>
          </View>
          
        </View>
        <CustomText>Put it in the yellow bin </CustomText>
      </View>
      <CircleNavIcon width={40} height={40}/>
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 7,
    borderRadius: 14,
    margin: 7,
    minWidth: windowWidth * 0.65,
    maxWidth: windowWidth * 0.9,
    backgroundColor: '#fff',
    elevation: 5,
    zIndex: 4,
  }
});
export default RecycleResultToast;