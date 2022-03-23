import { baseFireBaseURL } from "../../constants/Constants";

export const LINK_ID = 'link_id';
export const ADD_POINTS = 'add-points';
export const DECREMENT_POINTS = 'decrement_points';
export const RESET = 'reset';
export const UPDATE_LOCATION = 'update_location';
export const ADD_COUPON = 'add_coupon';
export const INVALIDATE_COUPON = 'invalidate_coupon';


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

export const updateUserLocation = (location) => {
  return async (dispatch, getState) => {
    try {
      dispatch({type: UPDATE_LOCATION, currentLocation: location});
      await fetch(baseFireBaseURL+`/users/${getState().user.userId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({location: location})
      });
    } catch(error) {
      console.log('Error thrown from setting location: ', error);
    }
  }
};

export const addCoupon = (pointsClaimed) => {
  return async (dispatch, getState) => {
    const userId = getState().user.userId;
    const coupons = getState().user.coupons ?? [];
    const points = getState().user.points;
    const date = new Date();
    let code = '';
    for(let i = 0; i < 13; i++) {
      const randChar = Math.floor(Math.random() * (90 - 65) + 65);
      const randNum = Math.floor(Math.random() * (9 - 0) + 0);
      if (i < 3) code += String.fromCharCode(randChar);
      else if (i <= 6) code += `${randNum}`;
      else if (i <= 10) code += String.fromCharCode(randChar);
      else code += `${randNum}`
    };
    date.setMonth(date.getMonth() + 2);
    const couponInfo = {code, invalid: false, expiryDate: date.toISOString()}
    dispatch({type: DECREMENT_POINTS, points: pointsClaimed});
    dispatch({type: ADD_COUPON, couponInfo});
    console.log('coupons', coupons);
    fetch(baseFireBaseURL+`/users/${userId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({
        coupons: [...coupons, couponInfo],
        points: points - pointsClaimed
      })
    })
    .then( _ => console.log('coupon added successfully'))
    .catch(err => console.log('error sending coupon to server: ', err));
  }
}

export const invalidateCoupon = (code) => {
  return async (dispatch, getState) => {
    const staleCoupons = getState().user.coupons.filter(coupon => coupon.code !== code) ?? [];
    const freshCoupons = [...staleCoupons, { code: code, invalid: true, expiryDate: '' }];
    dispatch({type: INVALIDATE_COUPON, freshCoupons});
    fetch(baseFireBaseURL+`/users/${getState().user.userId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({coupons: freshCoupons})
    })
    .then(_ => console.log('server invalidated coupon'))
    .catch(err => console.log('error invalidating in server: ', err));
  }
}