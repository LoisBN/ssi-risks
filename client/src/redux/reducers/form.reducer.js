import { FETCH_FORM } from '../actions/types';

export const form = (state = {}, action) => {
  switch (action.type) {
    case FETCH_FORM:
      return action.payload;
    default:
      return {};
  }
};
