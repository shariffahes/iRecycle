import React, { useCallback } from 'react';
import { StyleSheet, View, Image, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import CustomButton from '../Components/CustomUI/CustomButton';
import CustomHeader from '../Components/CustomUI/CustomHeader';
import CustomText from '../Components/CustomUI/CustomText';

const images = [
  "https://media.istockphoto.com/photos/plastic-pollution-picture-id1296032714?b=1&k=20&m=1296032714&s=170667a&w=0&h=ZJEpHOqwAqe6CWjsLGxWqkFJu0yBSrB_y0ZNanXOfr8=",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDwG9WyHTBVG_8JkuNq2ckwqeh1v2o34hs5A&usqp=CAU",
  "https://www.recyclingtoday.com/fileuploads/image/2018/05/Glass.jpg?w=736&h=414&mode=crop",
  "https://clarksvillenow.sagacom.com/files/2018/02/recycling-recycle-plastic-shutterstock-1170x768-1-1170x768.jpg",
  "https://www.nspackaging.com/wp-content/uploads/sites/4/2019/03/shutterstock_1492626947.jpg"
];

const RecycleResultScreen = ({route, navigation}) => {
  const {result} = route.params;
  const _findRecyclePoints = useCallback(() => {
    navigation.navigate('Main Map', {materialType: result.materialType, bin: result.bin});
  },[]);
  return (
    <>
    <CustomHeader navigation={navigation} title={result.materialType}/>
    <ScrollView style={{flexGrow: 1}} contentContainerStyle={{alignItems: 'center'}}>
      <CustomText color='#444' fontSize={14} style={{margin: 20, fontFamily: 'Poppins-SemiBold'}}>
         {result.generalInfo}
      </CustomText>
      {result.tips.map((tip, index) => {
        return <Article key={index} imageURL={images[index]} content={tip}/>
      })}
      <CustomButton title='Find recycle points' onPressHandler={_findRecyclePoints}/>
    </ScrollView>
    </>
  );
};

const Article = ({imageURL, url, content}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.articleContainer, {width: width * 0.8}]}>
      <Image source={{uri: imageURL}} style={styles.imageStyle}/>
      <View style={{width: '100%',justifyContent: 'center', marginHorizontal: 8}}>
        <CustomText color='#000' fontSize={13} bold={true} style={styles.articleTitle}>
          {content}
        </CustomText>
      </View>
    </View>
  );
}

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
  },
  articleContainer: {
    margin: 8,
    width: 100,
    minHeight: 90,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#222',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 0.5}
  },
  imageStyle: {
    resizeMode: 'cover',
    height: '100%',
    width: '30%',
    borderRadius: 12
  },
  articleTitle: {
    width: '60%',
    marginBottom: 5
  }
});
export default RecycleResultScreen;