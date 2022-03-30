import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomText from "../Components/CustomUI/CustomText";
import RankView from "../Components/RankView";
import UpArrow from '../../assets/svg/UpArrow.svg';
import DownArrow from '../../assets/svg/DownArrow.svg';
import Colors from "../constants/Colors";
import { getLeaderBoard, _extractId, _extractInfo } from "../constants/CustomFts";
import { useSelector } from "react-redux";

const LeaderBoard = () => {
  const [isLoading , setLoading] = useState(true);
  const [leaderBoard, setLeaderBoard] = useState([]);
  useEffect(() => {
    getLeaderBoard()
      .then(res => {
        setLoading(false);
        setLeaderBoard(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <View style={{ height: 90, width: 90, borderRadius: 17, backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color='#000' size='large'/>
        </View>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff', backgroundColor: 'rgba(0,200,25,0.2)',}}>
      <View style={styles.header}>
         <RankView topThree={leaderBoard.slice(0, 3)}/>
      </View>
      <ScrollView style={{height: '70%',backgroundColor: 'white', borderTopLeftRadius: 27, borderTopRightRadius: 27}}>
        {leaderBoard.map((user, index) => {
          const u = _extractInfo(user);
          const id = _extractId(user);
          return (
            <RankItem key={id} points={u.accumulatedPoints} name={u.fullName} avatar={u.avatar} rank={index+1} rankId={id}/>
          );
        })}
      </ScrollView>
    </View>
    );
};

const RankItem = ({points, avatar, name, rank, rankId}) => {
  const userId = useSelector(state => state.user.userId);
  return (
    <View style={[styles.rankItemContainer,
      { backgroundColor: userId === rankId ? 'rgba(0, 200, 25, 0.2)' 
                                           : 'rgba(235,235,235, 0.6)'}]}>
      <View style={styles.rightContainer}>
          <CustomText fontSize={16} bold={true} color='black'>{rank}</CustomText>
          <DownArrow width={15} height={15} />
      </View>
      <View style={styles.leftContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.circle}> 
          <Image source={{uri: avatar}} style={styles.imageStyle} resizeMode='cover'/>
        </View>
       <CustomText bold={true} fontSize={15} color='black'>{name}</CustomText>
      </View>
      <View style={{backgroundColor: Colors.green, borderRadius: 6, padding: 5}}>
        <CustomText fontSize={14} bold={true}>{points} points</CustomText>
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