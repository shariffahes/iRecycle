import { ADD_POINTS, DECREMENT_POINTS, LINK_ID, RESET } from "../Actions/user"

const initialState = {
  userId: null,
  points: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LINK_ID:
      return {...action.userInfo};
    case ADD_POINTS: 
      return {...state, points: state.points + action.newPoints}
    case DECREMENT_POINTS: 
      return {...state, points: state.points - action.deductedPoints}
    case RESET: 
      return initialState;
    default:
      return state;
  }
}