import React, { useMemo, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import CustomText from "./CustomUI/CustomText";
import { Ionicons } from '@expo/vector-icons';

const FilterView = ({children, enabled, setFilterOff}) => {
  const tabs = [{name: 'near me'}, {name: 'vending machines'}]
  return (
    <View style={{flex: 1}}>
      {enabled && <FilterTabs tabs={tabs} setFilterOff={setFilterOff}/>}
      {children}
    </View>
 );
};

const FilterTabs = ({ tabs, setFilterOff}) => {
  const [selectedTab, selectTabWithIndex] = useState(0);
  return (
    <>
    <ScrollView horizontal={true} style={styles.scrollContainer} contentContainerStyle={styles.scrollContentStyle}>
      <TouchableOpacity onPress={setFilterOff}>
        <Ionicons name="close-circle-outline" size={35} color='#000'/>
      </TouchableOpacity>
      {tabs.map((tab, index) => {
        return <TabView key={tab.name} tabName={tab.name} tabIndex={index} selectedTab={selectedTab}
                 onTabSelected={(ind) => selectTabWithIndex(ind)}/>
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
  }
});
export default FilterView;