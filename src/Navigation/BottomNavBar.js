import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, {useEffect} from "react";
import { StyleSheet, Linking } from "react-native";
import HomeStack from "./HomeStack";
import StoreScreen from "../Screens/StoreScreen";
import RequestScreen from "../Screens/RequestScreen";
import { Ionicons, Entypo } from '@expo/vector-icons';
import { renderHeaderOptions } from "../constants/CustomFts";
import LeaderBoard from "../Screens/LeaderBoard";
import LBIcon from "../../assets/svg/LeaderBoardIcon.svg";
import { useNavigation } from "@react-navigation/native";
import ProfileStack from "./ProfileStack";

const BottomStack = createBottomTabNavigator();

const renderScreenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    switch(route.name){
      case 'Map': 
        return <MapIcon color={color} size={size}/>
      case "Store":
        return <StoreIcon color={color} size={size} />
      case 'Discover':
        return <DiscoverIcon color={color} size={size} />
      case "LeaderBoard":
        return <LBIcon color={color} height={size} width={size}/>
      case "Profile":
        return <ProfileIcon color={color} size={size} />
      default:
        return <Ionicons name="help-outline" color={color} size={size}/>
    }
  },
    tabBarActiveTintColor: '#4D8D6E',
    tabBarInactiveTintColor: '#AAA0A0'
});

const MapIcon = ({size, color}) => {
  return <Ionicons size={size} name="map-outline" color={color}/>
};
const StoreIcon = ({ size, color }) => {
    return <Entypo size={size} name="shop" color={color} />
};
const DiscoverIcon = ({ size, color }) => {
    return <Entypo size={size} name="compass" color={color} />
};
const ProfileIcon = ({ size, color }) => {
  return <Entypo size={size} name="user" color={color} />
};

const BottomNavBar = () => {
    const {navigate} = useNavigation();
    useEffect(() => {
      const handleURL = ({url}) => {
        if(!url) return;
        const regex = new RegExp('.*//.*/--(.*)');
        const matched = url.match(regex);
        if (matched?.length == 2) {
          if (matched[1] === '/VM') {
            navigate('Recycling');
          }
          return;
        }else {
          return;
        }
      }
      Linking.addEventListener('url', handleURL)
      Linking.getInitialURL().then((url) => {
        handleURL({url});
      });
      () => {
        removeEventListener('url', handleURL);
      }
    }, []);
    return (
        <BottomStack.Navigator screenOptions={renderScreenOptions}>
            <BottomStack.Screen name="Map" component={HomeStack}
              options={{headerShown: false, tabBarShowLabel: false}} />
            <BottomStack.Screen name="Store" component={StoreScreen} options={renderHeaderOptions({applyMargin: true})}/>
            <BottomStack.Screen name="Discover" component={RequestScreen} options={renderHeaderOptions({ applyMargin: true })}/>
            <BottomStack.Screen name="LeaderBoard" component={LeaderBoard} options={{ ...renderHeaderOptions({ applyMargin: true }), unmountOnBlur: true}}/>
            <BottomStack.Screen name="Profile" component={ProfileStack} options={{...renderHeaderOptions({applyMargin: true}), headerShown: false}}/>
        </BottomStack.Navigator>
    );
};

const styles = StyleSheet.create({});
export default BottomNavBar;