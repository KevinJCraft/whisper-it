import { combineReducers } from "redux";
import postReducer from "./postReducer";
import errorReducer from "./errorReducer";
import authReuducer from "./authReducer";
import commentReducer from "./commentReducer";

export default combineReducers({
  posts: postReducer,
  error: errorReducer,
  auth: authReuducer,
  comments: commentReducer,
});
