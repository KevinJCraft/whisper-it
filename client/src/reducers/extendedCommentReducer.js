import { LOADING_EXTENDED_COMMENTS } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_EXTENDED_COMMENTS:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
