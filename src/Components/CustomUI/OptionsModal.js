import React from 'react';
import { Modal, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import CustomText from './CustomText';

const OptionsModal = ({data, isOpen, onClose}) => {

  const d = data.concat([{class: 'other'}])
  return (
    <Modal visible={isOpen} transparent={true} animationType='slide' animated={true}>
      <View style={styles.modalContentStyle}>
        <ScrollView style={{flex: 1, margin: 15}} contentContainerStyle={{alignItems: 'center', justifyContent:'center'}}>
          <CustomText style={{color: 'black', fontSize: 15}}>Multiple Objects detected</CustomText>
          <CustomText style={{color: 'black', fontSize: 15}}>Choose one of the following: </CustomText>
          {d.map((item, index) => {
            return (
              <TouchableOpacity key={index} style={{width: '100%', alignItems: 'center', justifyContent: 'center'}} onPress={() => onClose(item.class)}>
                <OptionCard name={item.class}/>
              </TouchableOpacity>);
          })}
        </ScrollView>
      </View>
    </Modal>);
};

const OptionCard = ({name}) => {
  return (
    <View style={styles.cardContainer}>
      <CustomText>{name}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
    margin: 10,
    padding: 10,
    width: '50%',
    backgroundColor: Colors.green
  },
  modalContentStyle: {
    minHeight: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 16,
    backgroundColor: 'white'
  }
})
export default OptionsModal;