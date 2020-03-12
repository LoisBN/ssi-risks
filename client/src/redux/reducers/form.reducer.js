import { FETCH_FORM, CLEAN_UP_FORM } from '../actions/types';

export const form = (state = {}, action) => {
  switch (action.type) {
    case FETCH_FORM:
      return action.payload;
    case CLEAN_UP_FORM:
      return {};
    default:
      return state;
  }
};
