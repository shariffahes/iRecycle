import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, useWindowDimensions, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import BackIcon from '../../../assets/svg/BackIcon.svg';
import CustomText from "./CustomText";
import RecycleIcon from "../../../assets/svg/RecycleIcon.svg"
import Colors  from "../../constants/Colors";

const CustomHeader = ({navigation, title}) => {
  const {height, width} = useWindowDimensions();
  const dynamicStyles = useMemo(() => StyleSheet.create({
    mainContainer: {
      height: height * 0.3
    }
  }),[height]);
  const _onPressHandler = useCallback(() => {
    navigation.goBack();
  },[]);

  return (
    <View style={[styles.mainContainer, dynamicStyles.mainContainer]}>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={_onPressHandler}>
          <View style={{marginLeft: 10, marginTop: 4}}>
           <BackIcon/>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
      <CustomText fontSize={30} bold={true} style={styles.title}>{title}</CustomText>
      <View style={{ position: 'absolute', bottom: -35,  alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width: 50, height: 50}}>
          <RecycleIcon/>
        </View>
        <View>
          <CustomText color={Colors.green} bold={true}>Recycable</CustomText>
        </View>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'green',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    marginBottom: 50
  },
  title: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto'
  }
});

export default CustomHeader;