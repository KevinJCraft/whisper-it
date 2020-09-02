import { GET_POSTS, ADD_POST, DELETE_POST } from "../actions/types";
import axios from "axios";

const INITIAL_STATE = {
  list: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        list: action.payload,
      };

    case ADD_POST:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
};
