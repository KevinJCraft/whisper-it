import { CLEAR_PROFILE, GET_USER_PROFILE } from "../actions/types";

const INITIAL_STATE = {
  profileName: null,
  posts: [],
  comments: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        profileName: action.payload.profileName,
        posts: action.payload.posts,
        comments: action.payload.comments,
      };
    case CLEAR_PROFILE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
