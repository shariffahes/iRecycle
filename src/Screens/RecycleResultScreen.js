import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import CustomText from '../Components/CustomUI/CustomText';

const RecycleResultScreen = ({route}) => {
  const {imageURL, result} = route.params;
  return (
    <ScrollView style={{flexGrow: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <Image source={{uri: imageURL}} resizeMode='cover' style={styles.preview}/>   
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{alignSelf: 'flex-start'}}>
          <CustomText style={styles.resultTitle}>This item should be thrown in the {result} bin</CustomText>
          <CustomText style={{color: '#000', marginHorizontal: 10}}>Info about the yellow bin</CustomText>
        </View>
        <Image source={require('../../assets/png/yellow-bin.png')} style={{width: 170 , height: 400, resizeMode: 'contain'}}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resultTitle: {
    fontWeight: '900',
    fontFamily: 'roboto-bold',
    fontSize: 18,
    color: '#000',
    margin: 10
  },
  preview: {
    height: 300,
    width: '100%'
  }
});
export default RecycleResultScreen;