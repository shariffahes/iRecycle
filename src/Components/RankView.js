import React, { useMemo } from "react";
import {View, StyleSheet, Image} from 'react-native';
import CustomText from './CustomUI/CustomText';
import Crown from '../../assets/svg/crown.svg';

const RankView = ({ rank}) => {
const dynamicStyles = useMemo(() => StyleSheet.create({
  rankView: {
    borderColor: rank === 1 ? 'gold' : rank === 2 ? 'green' : 'blue',
    height: rank === 1 ? 100 : 85,
    width: rank === 1 ? 100 : 85,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 50
  },
  rankNumber: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: rank === 1 ? 'gold' : rank === 2 ? 'green' : 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -2
  },
  container: {
    marginTop: rank !== 1 ? 90 : 0,
    alignItems: 'center'
  }
  }), [rank]);
  return (
    <View style={{alignItems: 'center'}}>
      {rank === 1 ? <Crown width={50} height={50} /> : null}
      <View style={dynamicStyles.container}>
      <CustomText style={{marginBottom: 5}} bold={true} color='black' fontSize={15}>
        Sharif Fahes
      </CustomText>
      <View style={[styles.rankView, dynamicStyles.rankView]}>
        <Image source={{uri: "https://img.favpng.com/19/16/1/computer-icons-png-favpng-t9NV5RQ9SB5GzU4r1kPEMaM3W.jpg"}} style={dynamicStyles.imageStyle} resizeMode='cover'/>
        <View style={dynamicStyles.rankNumber}>
          <CustomText color='black' bold={true} fontSize={14}>{rank}</CustomText>
        </View>
      </View>
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
  }
});

export default RankView;