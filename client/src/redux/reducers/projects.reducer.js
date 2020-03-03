import { FETCH_LIST_PROJ, PROJ_INIT } from '../actions/types';

export const projects = (state = [], action) => {
  switch (action.type) {
    case FETCH_LIST_PROJ:
      return action.payload;
    case PROJ_INIT:
      return [...state, action.payload];
    default:
      return state;
  }
};
