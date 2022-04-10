import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, ImageBackground, View, Linking, useWindowDimensions, TouchableOpacity, ScrollView } from "react-native";
import EntryHeader from '../../assets/svg/EntryHeader.svg'
import CustomText from "../Components/CustomUI/CustomText";
import {Video} from 'expo-av';

const imagesURL = [
  "https://static.vecteezy.com/system/resources/previews/004/599/903/original/hand-putting-empty-plastic-bottle-to-trash-recycle-bin-cartoon-illustration-vector.jpg",
  "https://www.recyclingbins.co.uk/media/wysiwyg/Recycling_Mistakes.jpg",
  "https://caneco.com.tr/wp-content/uploads/2021/01/environment-earth-day-hands-trees-growing-seedlings-1-scaled-2560x1280.jpg"
];
const RequestScreen = () => {
  const video = useRef(null);
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    if(video.current) {
      video.current.playAsync();
    }
  }, [video]);
  return (
      <ScrollView style={{flexGrow: 1}}>
        <EntryHeader width={width} height={0.2*height}/>
        <CustomText style={{ marginBottom: 10, padding: 9}} fontSize={27} bold={true} color='#000'>
          HighLights
        </CustomText>
        <Video ref={video} style={{width: '100%', height: 300}}
        source={require('../../assets/videos/RecyclePaper.mp4')}
        useNativeControls resizeMode="cover" isLooping={false}/>
        {renderSection()}
        
       </ScrollView>
    );
};

const renderSection = () => {
  return (
    <View style={{padding: 10}}>
      <View style={styles.upper}>
        <CustomText fontSize={27} bold={true} color='#000'>For You</CustomText>
      </View>
      <ScrollView horizontal style={styles.lower} showsHorizontalScrollIndicator={false}>
        <ContentView title='Plastic Recycle' imageURL={imagesURL[0]}/>
        <ContentView title='Recyle Mistakes you do'  imageURL={imagesURL[1]}/>
        <ContentView title='Importance of recycle' imageURL={imagesURL[2]}/>
      </ScrollView>
    </View>
  );
};

const ContentView = ({title, url, imageURL}) => {
  const onArticleClick = useCallback(() => {
    Linking.canOpenURL('https://sapphirevn.com/introduction-to-plastic-recycling/').then(_ => {
      Linking.openURL('https://sapphirevn.com/introduction-to-plastic-recycling/');
    })
  }, []);
  return (
    <TouchableOpacity style={{alignItems: 'center', marginHorizontal: 6}} onPress={onArticleClick}>
      <ImageBackground
        style={{width: 150, height: 130, borderRadius: 10}}
        imageStyle={{borderRadius: 10}}
        source={{ uri: imageURL}}>
      </ImageBackground>
      <CustomText style={{marginTop: 5}} fontSize={16} bold={true} color='#000'>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  upper: {
    flexDirection: 'row',
    marginBottom: 10
  },
  lower: {
    
  }
});
export default RequestScreen;