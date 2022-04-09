import React, { useEffect, useMemo, useRef } from "react";
import {View, StyleSheet, Image, Animated} from 'react-native';
import CustomText from './CustomUI/CustomText';
import { _extractInfo } from "../constants/CustomFts";

const RankView = ({ topThree}) => {
  const firstRank = topThree[0];
  const secondRank = topThree[1];
  const thirdRank = topThree[2];

  return (
    <View style={{alignItems: 'center', justifyContent:'flex-end'}}>
      <View style={{flexDirection: 'row'}}>
        <Profile rank={3} data={thirdRank}/>
        <Profile rank={1} data={firstRank}/>
        <Profile rank={2} data={secondRank}/>
      </View>
      <Stand/>
    </View>
  );
};

const Profile = ({rank, data}) => {
  const dynamicStyles = useMemo(() => StyleSheet.create({
    container: {
      marginTop: rank === 2 ? 65 : rank === 3 ? 100 : 30,
      alignItems: 'center',
    },
    rankView: {
      borderColor: rank === 1 ? 'gold' : rank === 2 ? 'green' : 'blue',
      height: rank === 1 ? 100 : rank === 2 ? 85 : 75,
      width: rank === 1 ? 100 : rank === 2 ? 85 : 75,
    },
    imageStyle: {
      height: '100%',
      width: '100%',
      borderRadius: 50
    },
  }),[rank]);
  const currentUser = _extractInfo(data);
  return (
    <View style={dynamicStyles.container}>
      {rank === 1 ? <View style={{transform: [{rotateZ: "-25deg"}]}}><Image source={require('../../assets/gif/crown.gif')} style={styles.crownStyle} resizeMode='cover' /></View>
                  : null}
      <View style={[styles.rankView, dynamicStyles.rankView]}>  
        <Image source={{ uri: currentUser?.avatar }} style={dynamicStyles.imageStyle} resizeMode='cover' />
        <CustomText style={{ marginTop: 5 }} bold={true} color='black' fontSize={15}>
          {currentUser?.fullName}
        </CustomText>
        <CustomText fontSize={12} bold={true} color='#aaa'>{currentUser?.accumulatedPoints} pts</CustomText>
      </View>
    </View>
  );
};
const Stand = () => {
  const rank1HeightValue = useRef(new Animated.Value(0)).current;
  const rank2HeightValue = useRef(new Animated.Value(0)).current;
  const rank3HeightValue = useRef(new Animated.Value(0)).current;
  const dynamicStyles = useMemo(() => StyleSheet.create({
    standTop: {
      width: 100,
      position: 'absolute',
      height: 30,
      top: -30
    }
  }), []);
  useEffect(() => {
    Animated.parallel([
      Animated.timing(rank1HeightValue, {
        toValue: 110,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(rank2HeightValue, {
        toValue: 80,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(rank3HeightValue, {
        toValue: 60,
        duration: 1000,
        useNativeDriver: false
      })
    ]).start();
  }, []);
  return (
    <View style={{flexDirection: 'row'}}>
    <Animated.View style={[styles.stand, 
        { transform: [{ rotateZ: "-25deg" }],
          backgroundColor: 'rgba(0,0,180,1)', position: 'absolute', bottom: -20, left: -80, 
          height: rank3HeightValue}]}>
      <View style={[dynamicStyles.standTop, {backgroundColor: 'rgba(50,50,180,0.5)'}]}/>
      <CustomText fontSize={27} bold={true}>{3}</CustomText>
    </Animated.View>
    <Animated.View style={[styles.stand, dynamicStyles.stand, {backgroundColor: 'rgba(235,190,0,1)', zIndex: 100, height: rank1HeightValue}]}>
      <View style={[dynamicStyles.standTop, {backgroundColor: 'rgba(240,190,90,0.7)'}]} />
      <CustomText fontSize={27} bold={true}>{1}</CustomText>
    </Animated.View >
    <Animated.View style={[styles.stand, dynamicStyles.stand, { transform: [{ rotateZ: "20deg" }], backgroundColor: 'rgba(0,180,0,1)', position: 'absolute', bottom: -10, right: -90, height: rank2HeightValue }]}>
      <View style={[dynamicStyles.standTop, {backgroundColor:  'rgba(50,180,50,0.5)'}]} />
      <CustomText fontSize={27} bold={true}>{2}</CustomText>
    </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  rankView: {
    marginHorizontal: 8,
    borderRadius: 50,
    borderWidth: 4,
    alignItems: 'center'
  },
  stand: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    marginTop: 30,
    width: 100,
  },
  crownStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: -50,
    right: 7,
    zIndex: 100
  }
});

export default RankView;