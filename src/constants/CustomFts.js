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

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p) / 2 +
    c(lat1 * p) * c(lat2 * p) *
    (1 - c((lon2 - lon1) * p)) / 2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
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