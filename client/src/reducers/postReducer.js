import { GET_POSTS, ADD_POST, LIKE_POST, CLEAR_POSTS } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS:
      return [...action.payload];

    case ADD_POST:
      return [...state, action.payload];
    case LIKE_POST:
      const posts = state.map((post) => {
        if (action.payload._id === post._id) return action.payload;
        else return post;
      });
      return [...posts];
    case CLEAR_POSTS:
      return INITIAL_STATE;

    default:
      return state;
  }
};
