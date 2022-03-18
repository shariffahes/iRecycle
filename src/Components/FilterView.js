import React, { useMemo, useState, useRef, useCallback } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import CustomText from "./CustomUI/CustomText";
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSelector } from "react-redux";
import NavigateIcon from '../../assets/svg/circular-navigate.svg'
const FilterView = ({children, enabled, setFilterOff, setFilter}) => {
  const tabs = [{name: 'near me'}, {name: 'vending machines'}];
  const bottomSheetRef = useRef(null);
  const recycleAreas = useSelector(state => state.recycleAreas);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  // callbacks 
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <>
    <View style={{flex: 1}}>
      {enabled && <FilterTabs tabs={tabs} setFilterOff={setFilterOff} setFilter={setFilter}/>}
      {children}
    </View>
      {enabled && <BottomSheet ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <CustomText style={{marginBottom: 14}} bold={true} fontSize={35} color='#a00'>Plastic{'\n'}recycle points</CustomText>
        {recycleAreas.vendingMachines.map((area, index) => {
          return (
            <FilterItem item={area} index={index}/>
           )
        })}
      </ScrollView>
    </BottomSheet>}
    </>
 );
};

const FilterItem = ({item, index}) => {
  return (
    <View style={{width: '100%'}}>
      <View style={{flexDirection: 'row', width: '85%', alignItems: 'center'}}>
        <View key={index} style={{ width: '100%' }}>
          <CustomText fontSize={18} bold={true} style={styles.fontStyle}>{item.title}</CustomText>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomText fontSize={14} style={{ ...styles.fontStyle, ...{ color: '#777' } }}>
              2.9 km
            </CustomText>
            <View style={styles.bullet}/>
            <CustomText fontSize={14} style={{ ...styles.fontStyle, ...{ color: '#777' } }}>
              Plastic recycle point
            </CustomText>
          </View>
          <CustomText fontSize={14} style={{ ...styles.fontStyle, ...{ color: '#777' } }}>
            Hamra, Beirut 
          </CustomText>
        </View>
        <TouchableOpacity onPress={() => console.log('navigate')}>
          <NavigateIcon height={45} width={45} />
        </TouchableOpacity>
      </View>
      <View style={[styles.divider, { width: '100%' }]} />
    </View>
  );
}

const FilterTabs = ({ tabs, setFilterOff, setFilter}) => {
  const [selectedTab, selectTabWithIndex] = useState(0);
  return (
    <>
    <ScrollView horizontal={true} style={styles.scrollContainer} contentContainerStyle={styles.scrollContentStyle}>
      <TouchableOpacity onPress={setFilterOff}>
        <Ionicons name="close-circle-outline" size={35} color='#000'/>
      </TouchableOpacity>
      {tabs.map((tab, index) => {
        return <TabView key={tab.name} tabName={tab.name} tabIndex={index} selectedTab={selectedTab}
                 onTabSelected={(ind) => {
                   setFilter(prev => {
                     const temp = prev.map((v, index) => {
                       if(index === ind) return true;
                       return false;
                     });
                     return temp;
                   });
                   selectTabWithIndex(ind);
                  }}/>
      })}
    </ScrollView>
    </>
  );
};

const TabView = ({tabName, tabIndex, onTabSelected, selectedTab}) => {
  const isTabSelected = tabIndex === selectedTab;
  const dynamicStyles = useMemo(() => StyleSheet.create({
    tabContainer: {
      backgroundColor: isTabSelected ? Colors.green : Colors.white,
    },
    text: {
      color: isTabSelected ? '#fff' : '#000'
    }
  }),[isTabSelected])
  return (
    <TouchableOpacity style={[styles.tabContainer, dynamicStyles.tabContainer]}
      onPress={() => onTabSelected(tabIndex)}>
      <CustomText fontSize={13} bold={true} style={dynamicStyles.text}>{tabName}</CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginHorizontal: 10
  },
  scrollContainer: {
    position: 'absolute',
    top: 17,
    left: 5,
    zIndex: 100,
    elevation: 1000
  },
  scrollContentStyle: {
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 13
  },
  fontStyle: {
    color: '#000',
    marginVertical: 2
  },
  divider: {
    height: 5,
    backgroundColor: '#eee',
    marginVertical: 8
  },
  bullet: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#aaa',
    marginHorizontal: 4
  }
});
export default FilterView;