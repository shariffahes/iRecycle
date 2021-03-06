import { async } from "@firebase/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseFireBaseURL, FireBaseKey } from "../../constants/Constants";
import { showError } from "../../constants/CustomFts";
import { populateUserData, resetUserInfo } from "./user";
export const SIGN_UP = "SIGN_UP";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOG_OUT = "LOG_OUT";

export const signUp = (email, password, fullName, avatar) => {
  return async (dispatch) => {
    try {
      const data = await _handleAuthentication(email, password, true);
      if(data.error?.message) _handleError(data.error.message);
      dispatch(setData(data.idToken, data.localId, parseInt(data.expiresIn) * 1000), data.refreshToken);
      const expirationDuration = new Date().getTime() + parseInt(data.expiresIn) * 1000;
      _saveDataToStorage(data.idToken, data.localId, expirationDuration);
      const response = await fetch(baseFireBaseURL + `/users/${data.localId}.json`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          points: 0,
          accumulatedPoints: 0,
          coupons: [],
          location: '',
          fullName: fullName,
          avatar: avatar
        })
      });
      const serverPostResponse = await response.json();
      if (serverPostResponse.error?.message) _handleError(serverPostResponse.error?.message);
      dispatch(populateUserData(data.localId));
    } catch (error) {
        throw error;
    }
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    try {
      const data = await _handleAuthentication(email, password);
      console.log(data);
      if (data.error?.message) _handleError(data.error.message);
      dispatch(setData(data.idToken, data.localId, parseInt(data.expiresIn) * 1000, data.refreshToken));
      const expirationDuration = new Date().getTime() + parseInt(data.expiresIn) * 1000;
      _saveDataToStorage(data.idToken, data.localId, expirationDuration);
      dispatch(populateUserData(data.localId));
    } catch (error) {
        console.log(error);
        throw error;
    }
  };
};

export const Logout = () => {
  AsyncStorage.removeItem("userData");
  _clearAnyPrevTimer();
  console.log('log out successful');
  return (dispatch) => {
    dispatch({type: LOG_OUT});
    dispatch(resetUserInfo());
  }
};

let timer;
const _saveDataToStorage = (token, userId, expireDuration, refreshToken) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ token: token, userId: userId, expiresIn: expireDuration, refreshToken: refreshToken })
  );
};
const _handleAuthentication = async (email, password, isSignUp) => {
  const actionType = isSignUp ? 'signUp' : 'signInWithPassword';
  const baseURL = `https://identitytoolkit.googleapis.com/v1/accounts:${actionType}?key=${FireBaseKey}`;
  try{
    const response = await fetch(
      baseURL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        });
    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
      throw error;
  }

}
const _clearAnyPrevTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
const _setLogOutTimer = (expirationDuration, refreshToken) => {
  return (dispatch, getState) => {
    _clearAnyPrevTimer();
    timer = setTimeout(async () => {
        console.log('called to refresh\n');
        try {
          const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${FireBaseKey}`,
                          { method: 'POST',
                            body: JSON.stringify({ grant_type: "refresh_token", refresh_token: refreshToken }),
                            headers: { "Content-Type": "application/json" }});
          const res = await response.json();
          const id = getState().user.userId;
          if (res.error?.message) {
            console.log(res.error);
            return;
          }
          dispatch(setData(res.id_token, id, parseInt(res.expires_in) * 1000, res.refresh_token));
        } catch (error) {
          console.log(error);
        }
    }, expirationDuration - 60000);
  };
};
export const setData = (token, userId, expireTime, refreshToken) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      refreshToken
    });
    dispatch(_setLogOutTimer(expireTime, refreshToken));
  };
};
const _handleError = (errorRes) => {
  let message = undefined;
  console.log(errorRes);
  switch(errorRes) {
    case "INVALID_EMAIL": 
      message = "This email is not registered. Check again or Sign up with this email";
      break;
    case "INVALID_PASSWORD":
      message = "The entered password is invalid.";
      break
    case "EMAIL_EXISTS":
      message = "This email is already registered. Sign in instead";
      break;
    case "EMAIL_NOT_FOUND":
      message = "The email is invalid. Please check again";
      break;
    default: 
      message = "Ops, an error has occured from our side. Please try again shortly";
  }
  showError(message);
  throw new Error(message);
}