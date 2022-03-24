import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomText from "../Components/CustomUI/CustomText";
import RankView from "../Components/RankView";
import UpArrow from '../../assets/svg/UpArrow.svg';
import DownArrow from '../../assets/svg/DownArrow.svg';

const LeaderBoard = () => {
  return (
    <View>
      <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 10, justifyContent: 'center'}}>
        <CustomText fontSize={28} color='black' bold={true}>Leaderboard</CustomText>
      </View>
      <View style={styles.header}>
        <RankView rank={2}/>
        <RankView rank={1}/>
        <RankView rank={3}/>
      </View>
      <View style={styles.currentRankContainer}>
        <CustomText>Your Current Rank</CustomText>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 0.3, alignItems: 'center'}}>
          <CustomText bold={true} fontSize={16}>200</CustomText>
          <DownArrow width={20} height={20} color='red'/>
        </View>
      </View>
      <ScrollView style={{flexGrow: 0.53}}>
        <RankItem/>
        <RankItem/>
        <RankItem/>
              <RankItem />
              <RankItem />
              <RankItem />
              <RankItem />
              <RankItem />
              <RankItem />
      </ScrollView>
    </View>
    );
};

const RankItem = () => {
  return (
    <View style={styles.rankItemContainer}>
      <View style={styles.leftContainer}>
       <View style={styles.circle}>
         <Image source={{uri: "https://img.favpng.com/19/16/1/computer-icons-png-favpng-t9NV5RQ9SB5GzU4r1kPEMaM3W.jpg"}} style={styles.imageStyle} resizeMode='cover'/>
       </View>
       <CustomText bold={true} fontSize={15} color='black'>Karem Al aridi</CustomText>
      </View>
      <View style={styles.rightContainer}>
       <CustomText fontSize={16} bold={true} color='black'>200</CustomText>
       <DownArrow width={20} height={20}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
   flexDirection: 'row',
   justifyContent: 'space-around',
   marginVertical: 8
  },
  currentRankContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: 'green',
    marginHorizontal: 12,
    marginVertical: 6
  },
  rankItemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 12,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 6,
    alignItems: 'center'
  },
  leftContainer: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  rightContainer: {
    flex: 0.3,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 20
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'red'
  }
});
export default LeaderBoard;