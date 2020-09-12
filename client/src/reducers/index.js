import { combineReducers } from "redux";
import postReducer from "./postReducer";
import errorReducer from "./errorReducer";
import authReuducer from "./authReducer";
import postAndCommentsReducer from "./postAndCommentsReducer";
import profileReducer from "./profileReducer";
import extendedCommentReducer from "./extendedCommentReducer";

export default combineReducers({
  posts: postReducer,
  error: errorReducer,
  auth: authReuducer,
  postAndComments: postAndCommentsReducer,
  profile: profileReducer,
  extendedComment: extendedCommentReducer,
});
