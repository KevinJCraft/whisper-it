import { GET_POSTS, ADD_POST, LIKE_POST } from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { createBrowserHistory } from "history";

export const getPosts = (dispatch, sort) => {
  axios.get(`/api/posts/${sort}`).then((res) => {
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  });
};

export const addPost = (dispatch, post) => {
  axios.post("/api/posts", post, tokenConfig()).then((res) => {
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  });
};

export const likePost = (dispatch, data) => {
  axios.put(`/api/posts/like`, data, tokenConfig()).then((res) => {
    dispatch({
      type: LIKE_POST,
      payload: res.data,
    });
  });
};

export const deletePost = (dispatch, { id }) => {
  axios.delete(`/api/posts/delete/${id}`, tokenConfig()).then((res) => {
    console.log("made it");
    createBrowserHistory().push("/");
  });
};
