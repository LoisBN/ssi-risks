import { LOGIN, SIGNUP, LOGOUT } from '../actions/types';

export const auth = (state = { authenticated: false }, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...action.payload, authenticated: true };
    case SIGNUP:
      return { ...action.payload, authenticated: true };
    case LOGOUT:
      return { authenticated: false };
    default:
      return { authenticated: false };
  }
};
