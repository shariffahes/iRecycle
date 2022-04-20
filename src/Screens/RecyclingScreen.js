import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";
import CustomButton from "../Components/CustomUI/CustomButton";
import CustomText from "../Components/CustomUI/CustomText";
import { getDatabase, onValue, ref, set } from 'firebase/database'
import auth from "../Store/Reducers/auth";
import RedeemedPointsView from "../Components/CustomUI/RedeemedPointsView";
import CollectedPoints from "../Components/CustomUI/CollectedPoints";
import { useDispatch, useSelector } from "react-redux";
import { addPoints } from "../Store/Actions/user";
import { showError } from "../constants/CustomFts";


const RecyclingScreen = ({navigation}) => {
  const [authenticated, setAuth] = useState(false);
  const db = getDatabase();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {authenticated ? <RecycleCounter db={db} navigation={navigation}/> : <CodeInput setAuth={setAuth} db={db}/>}
    </View>
  );
};

const RecycleCounter = ({db, navigation}) => {
  const [pointsCollected, setPoints] = useState(0);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const pointsRef = ref(db, '/recyclers/VM/User');
    const unsubscribe = onValue(pointsRef, (snapshot) => {
      if(snapshot.val()) {
        const id = user.userId;
        setPoints(snapshot.val()[id]);
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);
  const _onCollectHandler = useCallback(() => {
    const reference = ref(db, '/recyclers/VM');
    let code = '';
    for(let i = 0; i < 4; i++) {
      const randChar = Math.floor(Math.random() * (90 - 65) + 65);
      const randNum = Math.floor(Math.random() * (9 - 0) + 0);
      if (i < 3) code += String.fromCharCode(randChar);
      else code += `${randNum}`
    };
    set(reference, {'Code': code});
    dispatch(addPoints(pointsCollected));
    navigation.navigate('Main Map');
  }, [ref, navigation, pointsCollected]);
  return (
    <View>
      <CollectedPoints points={pointsCollected} _onPress={_onCollectHandler}/>
    </View>
  );
}

const CodeInput = ({setAuth, db}) => {
  const inputRef = useRef();
  const user = useSelector(state => state.user);
  const [code, setCode] = useState('');
  const [vmCode, setVMCode] = useState();
  const codeArray = useMemo(() => {
    const c = [];
    for(var i=0; i<4; i++) {
      if (i < code.length) {
        c.push(code.charAt(i));
      } else {
        c.push('');
      }
    };
    return c;
  }, [code]);
  const _handlePress = useCallback(() => {
    if(inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);
  const NumberView = ({digit}) => {
    return (
      <View style={styles.numberContainer}>
        <Text style={{fontSize: 30}}>{digit}</Text>
      </View>
    );
  };
  useEffect(() => {
    const codeRef = ref(db, 'recyclers/VM/Code');
    const unsubscribe = onValue(codeRef, (snapshot) => {
      setVMCode(snapshot.val());
    });
    return () => {
      unsubscribe();
    }
  }, []);
  const _onSubmitCode = useCallback(() => {
    const vmRef = ref(db, '/recyclers/VM');
    if(vmCode && vmCode === code) {
      setAuth(true);
      set(vmRef, {User: {[user.userId]: 0}});
    } else {
      showError('Invalid Code');
    }
  }, [code, setAuth, vmCode, ref]);

  if(!vmCode) return <Text>Wait until the other recycler finish! Then your turn will come!</Text>
  return (
    <>
    <View style={{width: '60%', margin: 25}}>
      <CustomText color='#000'>Enter the code that is on the vending machine screen</CustomText>
    </View>
    <Pressable style={styles.inputContainer} onPress={_handlePress}>
      {codeArray.map((digit, index) => <NumberView key={index} digit={digit}/>)}
    </Pressable>
    <View style={{marginTop: 20}}>
      <CustomButton title='Submit' onPressHandler={_onSubmitCode} disabled={code.length < 4}/>
    </View>
    <TextInput ref={inputRef} value={code} onChangeText={(v) => setCode(v)} autoCapitalize='characters' returnKeyType="done" maxLength={4} style={styles.hiddenInput}/>
    </>
  );
}

const styles = StyleSheet.create({
  hiddenInput: {
    backgroundColor: 'red',
    position: 'absolute',
    width: 100,
    opacity: 0
  },
  inputContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  numberContainer: {
    borderRadius: 7,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 5,
    width: 50,
    height: 50
  }
});
export default RecyclingScreen;