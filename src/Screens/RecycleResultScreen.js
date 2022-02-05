import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import CustomText from '../Components/CustomUI/CustomText';

const RecycleResultScreen = ({route}) => {
  const {imageURL, result} = route.params;
  return (
    <ScrollView style={{flexGrow: 1}}>
        <View style={{flex: 1}}>
         <Image source={{uri: imageURL}} resizeMode='cover' style={styles.preview}/>   
        </View>
      
      <View>
        <CustomText style={styles.resultTitle}>{result}</CustomText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resultTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#000'
  },
  preview: {
    height: 400,
    width: '100%'
  }
});
export default RecycleResultScreen;