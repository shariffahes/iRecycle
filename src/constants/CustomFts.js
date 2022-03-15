import Logo from '../../assets/svg/Logo.svg';
import RedeemedPointsView from "../Components/CustomUI/RedeemedPointsView";
import { View, StyleSheet } from 'react-native';
import { materials, materialInfo } from '../Data/items';
export const identifyMaterial = (itemName) => {
    let res;
    console.log(itemName);
    const alias = itemName.split(',');
    for(let i = 0; i < alias.length; i++) {
      for(const [key,value] of Object.entries(materials)) {
        if(alias[i] === key) {
          res = materialInfo[value];
        }
      }
    }
   if(!res) res = {type: 'Unkniwn', generalInfo: 'no info', tips: [], pointsValue: 0};
   return res;
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
};


const styles = StyleSheet.create({
  leftStyles: {
    marginLeft: 16,
    marginTop: 6
  },
  rightStyles: {
    marginRight: 16
  }
});