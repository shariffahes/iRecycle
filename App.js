import 'react-native-gesture-handler';
import MainNavigator from "./src/Navigation/MainNavigator";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { ModelProvider } from './src/contexts/ModelContext';
import { LogBox } from 'react-native';
import { warningMSG } from './WarningMessage';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import authReducer from './src/Store/Reducers/auth';
import ReduxThunk from "redux-thunk";
import prodReducer from "./src/Store/Reducers/products";
import userReducer from "./src/Store/Reducers/user";
import recycleAreasReducer from "./src/Store/Reducers/RecyclePoints";
import Toast from "react-native-toast-message";
import { toastConfig } from './src/constants/toastConfig';
import { initializeFB } from './src/constants/CustomFts';

const rootReducer = combineReducers({
  auth: authReducer,
  prod: prodReducer,
  user: userReducer,
  recycleAreas: recycleAreasReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
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

  useEffect(() => {
    initializeFB();
  }, []);
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
      <Provider store={store}>
        <MainNavigator />
        <Toast config={toastConfig}/>
      </Provider>
    </ModelProvider>
  );
};

const _checkForToken = () => {

}
