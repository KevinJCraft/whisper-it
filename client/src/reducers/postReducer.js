import { GET_POSTS, ADD_POST, DELETE_POST } from "../actions/types";
import axios from "axios";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS:
      return [...action.payload];

    case ADD_POST:
      return [...state, action.payload];
    default:
      return state;
  }
};
