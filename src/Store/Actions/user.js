import { baseFireBaseURL } from "../../constants/Constants";
export const ADD_POINTS = 'add-points';
export const DECREMENT_POINTS = 'decrement_points';
export const RESET = 'reset';
export const UPDATE_LOCATION = 'update_location';
export const ADD_COUPON = 'add_coupon';
export const INVALIDATE_COUPON = 'invalidate_coupon';
export const POPULATE_USER_DATA = 'populate_user_data';

export const populateUserData = (id) => {
  return async (dispatch) => {
    const userRequest = await fetch(baseFireBaseURL + `/users/${id}.json`);
    const userDataResponse = await userRequest.json();
    if (userDataResponse.error?.message) _handleError(userDataResponse.error?.messag);
    dispatch({ type: POPULATE_USER_DATA, userData: { userId: id, points: userDataResponse.points, location: userDataResponse.location, coupons: userDataResponse.coupons, name:  userDataResponse.fullName, avatar: userDataResponse.avatar, accumulatedPoints: userDataResponse.accumulatedPoints}
});
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
      body: JSON.stringify({points: getState().user.points + numberOfPoints, accumulatedPoints: getState().user.accumulatedPoints + numberOfPoints})
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
      if(!getState().user.userId) {
        console.log('no user id');
        return;
      }
      await fetch(baseFireBaseURL+`/users/${getState().user.userId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({location: location})
      });
    } catch(error) {
      console.log('Error thrown from setting location: ', error);
    }
  }
};

export const addCoupon = (pointsClaimed, company, logo, title) => {
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
    const couponInfo = {code, invalid: false, expiryDate: date.toISOString(), companyName: company,
      bgImageURL: logo, logo: logo, title: title};
    const newCoupons = [...coupons, couponInfo];
    console.log('all coupons: ', newCoupons);
    dispatch(decrementPoints(pointsClaimed));
    dispatch({type: ADD_COUPON, coupons: newCoupons});
    fetch(baseFireBaseURL+`/users/${userId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({
        coupons: newCoupons,
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
    console.log(freshCoupons);
    dispatch({type: INVALIDATE_COUPON, freshCoupons});
    fetch(baseFireBaseURL+`/users/${getState().user.userId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({coupons: freshCoupons})
    })
    .then(_ => console.log('server invalidated coupon'))
    .catch(err => console.log('error invalidating in server: ', err));
  }
}