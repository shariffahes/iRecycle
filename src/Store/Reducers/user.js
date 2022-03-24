import { AUTHENTICATE } from "../Actions/auth";
import { ADD_COUPON, ADD_POINTS, DECREMENT_POINTS, INVALIDATE_COUPON, LINK_ID, POPULATE_USER_DATA, RESET, UPDATE_LOCATION } from "../Actions/user"

const initialState = {
  userId: null,
  points: 0,
  //TODO: 
  location: { 
    latitude: 33.893784206851954,
    longitude: 35.47821038113525, 
    latitudeDelta: 0.006, 
    longitudeDelta: 0.02 },
  coupons: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case POPULATE_USER_DATA:
      return action.userData;
    case ADD_POINTS: 
      return {...state, points: state.points + action.newPoints}
    case DECREMENT_POINTS: 
      return {...state, points: state.points - action.deductedPoints}
    case UPDATE_LOCATION:
      return {...state, location: action.currentLocation};
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