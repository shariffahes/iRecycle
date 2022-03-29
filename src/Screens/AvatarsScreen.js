import React, {useEffect, useState} from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import {baseFireBaseURL} from '../constants/Constants';

const AvatarsScreen = ({route}) => {
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
  if(isLoading) return <ActivityIndicator/>;
  return (
    <ScrollView horizontal={true} >
      {Object.values(avatars).map((avatarURL, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => onSelectAvatar(avatarURL)}>
            <View style={styles.container}>
              <Image source={{ uri: avatarURL}} resizemode='cover' style={{height: '100%', height: '100%'}}/>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100
  }
});
export default AvatarsScreen;