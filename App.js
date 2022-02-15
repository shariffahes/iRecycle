import 'react-native-gesture-handler';
import MainNavigator from "./src/Navigation/MainNavigator";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { ModelProvider } from './src/contexts/ModelContext';
import { LogBox } from 'react-native';
import { warningMSG } from './WarningMessage';
// Fonts
const fetchFonts = () => {
  return Font.loadAsync({
    "roboto": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Poppins": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf")
  });
};
export default function App() {
  const [loadedFont, setLoadedFont] = useState(false);
  //ignore the ANNOYING warning about tf supress :|
  LogBox.ignoreLogs([warningMSG]);

  if (!loadedFont) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoadedFont(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <ModelProvider>
      <MainNavigator authenticated={false}/>
    </ModelProvider>
  );
}
