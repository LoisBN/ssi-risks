import {FETCH_ANSWER,CLEAN_UP_ANSWER} from  "../actions/types/index"

export const answer = ( state = {}, action ) => {
  switch (action.type) {
    case FETCH_ANSWER:
      return action.payload;
    case CLEAN_UP_ANSWER:
      return {};
    default:
      return state;
  }
};
