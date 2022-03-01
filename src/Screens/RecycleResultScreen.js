import React, { useCallback } from 'react';
import { StyleSheet, View, Image, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import CustomButton from '../Components/CustomUI/CustomButton';
import CustomHeader from '../Components/CustomUI/CustomHeader';
import CustomText from '../Components/CustomUI/CustomText';

const RecycleResultScreen = ({route, navigation}) => {
  const {result} = route.params;
  const _findRecyclePoints = useCallback(() => {
    navigation.navigate('Main Map', {materialType: result});
  },[]);
  return (
    <>
    <CustomHeader navigation={navigation} />
    <ScrollView style={{flexGrow: 1}} contentContainerStyle={{alignItems: 'center'}}>
      <CustomText color='#444' fontSize={14} style={{margin: 20, fontFamily: 'Poppins-SemiBold'}}>
          It can take up to 1000 years for plastic to decompose in landfills. plastic bags we use in our everyday life take 10-20 years to decompose, while plastic bottles take 450 years.
      </CustomText>
      <Article imageURL='https://media.istockphoto.com/photos/plastic-pollution-picture-id1296032714?b=1&k=20&m=1296032714&s=170667a&w=0&h=ZJEpHOqwAqe6CWjsLGxWqkFJu0yBSrB_y0ZNanXOfr8=' title='Effect of plastic on the world'/>
      <Article imageURL='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDwG9WyHTBVG_8JkuNq2ckwqeh1v2o34hs5A&usqp=CAU' title='The crisis of plastic'/>
      <CustomButton title='Find recycle points' onPressHandler={_findRecyclePoints}/>
    </ScrollView>
    </>
  );
};

const Article = ({imageURL, url, title}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.articleContainer, {width: width * 0.8}]}>
      <Image source={{uri: imageURL}} style={styles.imageStyle}/>
      <View style={{justifyContent: 'center', marginHorizontal: 8}}>
        <CustomText color='#000' fontSize={13} bold={true} style={styles.articleTitle}>{title}</CustomText>
        <TouchableOpacity>
          <CustomText fontSize={12} color='#000'>Read More</CustomText>
        </TouchableOpacity>
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
    height: 90,
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
    marginBottom: 5
  }
});
export default RecycleResultScreen;