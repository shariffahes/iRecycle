import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomText from "../Components/CustomUI/CustomText";
import RankView from "../Components/RankView";
import UpArrow from '../../assets/svg/UpArrow.svg';
import DownArrow from '../../assets/svg/DownArrow.svg';
import Colors from "../constants/Colors";
const LeaderBoard = () => {
  return (
    <View style={{backgroundColor: '#fff', backgroundColor: 'rgba(0,200,25,0.2)',}}>
      <View style={styles.header}>
         <RankView/>
      </View>
      <ScrollView style={{flexGrow: 0.54,backgroundColor: 'white', borderTopLeftRadius: 27, borderTopRightRadius: 27}}>
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
      <View style={styles.rightContainer}>
          <CustomText fontSize={16} bold={true} color='black'>200</CustomText>
          <DownArrow width={15} height={15} />
      </View>
      <View style={styles.leftContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.circle}> 
          <Image source={{uri: "https://img.favpng.com/19/16/1/computer-icons-png-favpng-t9NV5RQ9SB5GzU4r1kPEMaM3W.jpg"}} style={styles.imageStyle} resizeMode='cover'/>
        </View>
       <CustomText bold={true} fontSize={15} color='black'>Karem Al aridi</CustomText>
      </View>
      <View style={{backgroundColor: Colors.green, borderRadius: 6, padding: 5}}>
        <CustomText fontSize={14} bold={true}>9000 points</CustomText>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
   flexDirection: 'row',
   justifyContent: 'space-around',
   overflow: 'hidden'
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
    marginVertical: 6,
    backgroundColor: 'rgba(235,235,235, 0.6)',
    borderRadius: 14,
    marginHorizontal: 14,
    paddingHorizontal: 8,
    paddingVertical: 10,
    alignItems: 'center'
  },
  leftContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8
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