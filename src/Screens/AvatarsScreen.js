import React, {useCallback, useEffect, useState} from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SvgUri } from 'react-native-svg';
import CustomText from '../Components/CustomUI/CustomText';
import {baseFireBaseURL} from '../constants/Constants';

const AvatarsScreen = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [avatars, setAvatars] = useState([]);
  const onSelectAvatar = route.params.setAvatar;
  useEffect(() => {
    const fetchAvatars = async () => {
      try{
        const res = await fetch(baseFireBaseURL+'/avatars.json');
        const decodedRes = await res.json();
        setLoading(false);
        setAvatars(decodedRes);
      } catch(error) {
        console.log(error);
        setLoading(false);
        return;
      }
    };
    fetchAvatars();
  }, []);
  const renderAvatar = useCallback(({item, index}) => {
    return (
      <TouchableOpacity key={index} onPress={() => {
        onSelectAvatar(item);
        navigation.goBack();
      }}>
        <View style={styles.container}>
          <SvgUri
            width="100%"
            height="100%"
            uri={item}
          />
        </View>
      </TouchableOpacity>
    );
  }, [avatars])
  if(isLoading) return <ActivityIndicator/>;
  return (
    <>
    <CustomText style={{marginVertical: 10, alignSelf: 'center', paddingBottom: 8}} fontSize={25} bold={true} color='#000'>Choose Your Avatar</CustomText>
    <FlatList
      data={Object.values(avatars)}
      renderItem={renderAvatar}
      numColumns={3}
      keyExtractor={(_, index) => index}
      contentContainerStyle={{alignItems: 'center'}}
    />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    marginVertical: 8,
    borderRadius: 50,
    backgroundColor: '#bbb',
    marginHorizontal: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default AvatarsScreen;