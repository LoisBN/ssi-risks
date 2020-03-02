import { FETCH_LIST_PROJ } from '../actions/types';

export const projects = (state = [], action) => {
  switch (action.type) {
    case FETCH_LIST_PROJ:
      return action.payload;
    default:
      return state;
  }
};
