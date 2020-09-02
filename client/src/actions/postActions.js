import { GET_POSTS, ADD_POST, DELETE_POST } from "./types";
import axios from "axios";

export const getPosts = (dispatch) => {
  axios.get("/api/posts").then((res) => {
    console.log("inside: ", res.data);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  });
};

export const addPost = (dispatch, post) => {
  axios.post("/api/posts", post).then((res) => {
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  });
};
