import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, useWindowDimensions, Image, TouchableOpacity } from 'react-native';
import CustomText from '../Components/CustomUI/CustomText';

export const toastConfig = {
  recycleResult: (setting) => {
    const {materialType, pointsValue, binType, navigation} = setting.props;
    const {width} = useWindowDimensions();
    const dynamicStyles = useMemo(() => StyleSheet.create({
      container: {
        minWidth: width * 0.8
      }
    }), [width]);
    const _onPressHandler = useCallback(() => {
      navigation.navigate('Result', { result: materialType });
    },[]);

    return (
      <TouchableOpacity onPress={_onPressHandler}>
        <View style={[styles.mainContainer, dynamicStyles.container]}>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/png/bottle.png')} style={styles.icon}/>
          </View>
          <View style={{ marginHorizontal: 7 }}>
            <View style={styles.header}>
              <CustomText style={{marginRight: 5}} color='#000' bold={true}>
                {materialType}
              </CustomText>
              <CustomText color='#000' fontSize={14} bold={true}>  {pointsValue} <CustomText color='grey' fontSize={14}>points</CustomText></CustomText>
            </View>
            <CustomText color='#000' fontSize={15}>Put it in the 
            <CustomText bold={true} color='#000' fontSize={15}> "{binType}"</CustomText> bin
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2, 
    elevation: 7
  },
  imageContainer: {
      width: 45,
      height: 45,
      backgroundColor: '#19f',
      borderRadius: 7,
      marginHorizontal: 4,
      justifyContent: 'center',
      alignItems: 'center'
  },
  icon: {
    resizeMode: 'contain',
    height: 35,
    width: 35
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4
  }
});