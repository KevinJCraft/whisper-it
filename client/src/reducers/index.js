import { combineReducers } from "redux";
import postReducer from "./postReducer";
import errorReducer from "./errorReducer";
import authReuducer from "./authReducer";

export default combineReducers({
  posts: postReducer,
  error: errorReducer,
  auth: authReuducer,
});
