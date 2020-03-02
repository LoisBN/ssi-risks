import { TEST } from '../actions/types';

export const test = (state = {}, action) => {
  switch (action.type) {
    case TEST:
      return action.payload;
    default:
      return state;
  }
};
