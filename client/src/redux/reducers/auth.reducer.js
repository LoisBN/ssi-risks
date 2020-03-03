import { LOGIN, SIGNUP, LOGOUT, AUTOLOGIN } from '../actions/types';

export const auth = (state = { authenticated: false }, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...action.payload, authenticated: true };
    case SIGNUP:
      return { ...action.payload, authenticated: true };
    case LOGOUT:
      return { authenticated: false };
    case AUTOLOGIN:
      if (action.payload.access_token) {
        return { ...action.payload, authenticated: true };
      }
      return { authenticated: false };
    default:
      return state;
  }
};
