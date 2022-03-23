import { AUTHENTICATE } from "../Actions/auth";
import { ADD_COUPON, ADD_POINTS, DECREMENT_POINTS, INVALIDATE_COUPON, LINK_ID, RESET, UPDATE_LOCATION } from "../Actions/user"

const initialState = {
  userId: null,
  points: null,
  location: { 
    latitude: 33.893784206851954,
    longitude: 35.47821038113525, 
    latitudeDelta: 0.006, 
    longitudeDelta: 0.02 },
  coupons: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LINK_ID:
      return {...action.userInfo};
    case ADD_POINTS: 
      return {...state, points: state.points + action.newPoints}
    case DECREMENT_POINTS: 
      return {...state, points: state.points - action.deductedPoints}
    case UPDATE_LOCATION:
      return {...state, location: action.currentLocation};
    case AUTHENTICATE: 
      return {...state, userId: action.userId};
    case ADD_COUPON: 
      return {...state, coupons: action.coupons}
    case INVALIDATE_COUPON:
      return {...state, coupons: action.freshCoupons};
    case RESET: 
      return initialState;
    default:
      return state;
  }
}