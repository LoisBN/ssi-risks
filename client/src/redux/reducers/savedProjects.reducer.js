import { FETCH_SAVED_PROJ } from '../actions/types';

export const savedProjects = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SAVED_PROJ:
      return action.payload;
    default:
      return state;
  }
};
