import { baseFireBaseURL } from "../../constants/Constants";

export const LINK_ID = 'link_id';
export const ADD_POINTS = 'add-points';
export const DECREMENT_POINTS = 'decrement_points';
export const RESET = 'reset';

export const linkUser = (userInfo) => {
  return async (dispatch) => {
    dispatch({type: LINK_ID, userInfo});
  }
};

export const resetUserInfo = () => {
  return (dispatch) => {
    dispatch({type: RESET});
  };
};

export const addPoints = (numberOfPoints) => {
  return async (dispatch, getState) => {
   fetch(baseFireBaseURL+`/users/${getState().user.userId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({points: getState().user.points + numberOfPoints})
    }).then(_ => console.log('points added: '))
      .catch(error => console.log('error: ', error));

    dispatch({type: ADD_POINTS, newPoints: numberOfPoints});
  }
};

export const decrementPoints = (numberOfPoints) => {
  return async (dispatch, getState) => {
    fetch(baseFireBaseURL + `/users/${getState().user.userId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({ points: getState().user.points - numberOfPoints })
    }).then(_ => console.log('points decremented'))
      .catch(error => console.log('error: ', error));
    
    dispatch({type: DECREMENT_POINTS, deductedPoints: numberOfPoints});
  }
}