import { combineReducers } from "redux";
import postReducer from "./postReducer";
import errorReducer from "./errorReducer";
import authReuducer from "./authReducer";
import commentReducer from "./commentReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  posts: postReducer,
  error: errorReducer,
  auth: authReuducer,
  comments: commentReducer,
  profile: profileReducer,
});
