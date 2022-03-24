import React, { useMemo } from "react";
import {View, StyleSheet, Image} from 'react-native';
import CustomText from './CustomUI/CustomText';
import Crown from '../../assets/svg/crown.svg';
import Colors from "../constants/Colors";

const RankView = ({ rank}) => {
  return (
    <View style={{alignItems: 'center', justifyContent:'flex-end'}}>
      <View style={{flexDirection: 'row'}}>
        <Profile rank={3} />
        <Profile rank={1} />
        <Profile rank={2} />
      </View>
      <Stand/>
    </View>
  );
};

const Profile = ({rank}) => {
  const dynamicStyles = useMemo(() => StyleSheet.create({
    container: {
      marginTop: rank === 2 ? 65 : rank === 3 ? 100 : 30,
      alignItems: 'center'
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

  return (
    <View style={dynamicStyles.container}>
      {rank === 1 ? <View style={styles.crownStyle}>
          <Crown width={50} height={50} />
        </View>
          : null}
      <View style={[styles.rankView, dynamicStyles.rankView]}>  
        <Image source={{ uri: "https://img.favpng.com/19/16/1/computer-icons-png-favpng-t9NV5RQ9SB5GzU4r1kPEMaM3W.jpg" }} style={dynamicStyles.imageStyle} resizeMode='cover' />
        <CustomText style={{ marginTop: 5 }} bold={true} color='black' fontSize={15}>
          Sharif Fahes
        </CustomText>
        <CustomText fontSize={12} bold={true} color='#aaa'>2k pts</CustomText>
      </View>
    </View>
  );
};
const Stand = () => {
  const dynamicStyles = useMemo(() => StyleSheet.create({
    stand: {
      height: 60
    },
    standTop: {
      width: 100,
      position: 'absolute',
      height: 30,
      top: -30
    }
  }), []);
  return (
    <View style={{flexDirection: 'row'}}>
    <View style={[styles.stand, dynamicStyles.stand,
        { transform: [{ rotateZ: -0.3 }],
          backgroundColor: 'rgba(0,0,180,1)', position: 'absolute', bottom: -20, left: -80}]}>
      <View style={[dynamicStyles.standTop, {backgroundColor: 'rgba(50,50,180,0.5)'}]}/>
      <CustomText fontSize={27} bold={true}>{3}</CustomText>
    </View>
    <View style={[styles.stand, dynamicStyles.stand, {backgroundColor: 'rgba(235,190,0,1)', zIndex: 100, height: 110}]}>
      <View style={[dynamicStyles.standTop, {backgroundColor: 'rgba(240,190,90,0.7)'}]} />
      <CustomText fontSize={27} bold={true}>{1}</CustomText>
    </View>
    <View style={[styles.stand, dynamicStyles.stand, { transform: [{ rotateZ: 0.2 }], backgroundColor: 'rgba(0,180,0,1)', position: 'absolute', bottom: -10, right: -90, height: 80 }]}>
      <View style={[dynamicStyles.standTop, {backgroundColor:  'rgba(50,180,50,0.5)'}]} />
      <CustomText fontSize={27} bold={true}>{2}</CustomText>
    </View>
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
    transform: [{rotateZ: 0.5}],
    position: 'absolute',
    top: -25,
    right: -4,
    zIndex: 100
  }
});

export default RankView;