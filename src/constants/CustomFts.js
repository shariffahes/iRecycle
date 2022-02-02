import { yellowBinItems } from '../Data/yellowBinList';
import { redBinItems } from '../Data/redBinList';
import Logo from '../../assets/svg/Logo.svg';
import RedeemedPointsView from "../Components/CustomUI/RedeemedPointsView";
import { View, StyleSheet } from 'react-native';

export const identifyWhichBin = (itemName) => {
    let res;
    res = yellowBinItems.find(item => item == itemName);
    if(res) return "YELLOW";
    res = redBinItems.find(item => item == itemName);
    if(res) return "RED";
    return "UNKNOWN";
}

export const renderHeaderOptions = ({applyMargin}) => {
  return ({
    headerLeft: () => <View style={applyMargin && styles.leftStyles}>
                        <Logo width={150} height={50} />
                      </View>,
    headerRight: () => <View style={applyMargin && styles.rightStyles}>
                         <RedeemedPointsView/>
                       </View>,
    title: ''
  });
}

const styles = StyleSheet.create({
  leftStyles: {
    marginLeft: 16,
    marginTop: 6
  },
  rightStyles: {
    marginRight: 16
  }
});