import { AUTHENTICATE, LOG_OUT } from "../Actions/auth";

const initialState = {
  token: null,
  userId: null,
  refreshToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: 
      return {token: action.token, userId: action.userId, refreshToken: action.refreshToken};
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
} 