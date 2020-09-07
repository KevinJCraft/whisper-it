import {
  GET_POSTS,
  ADD_POST,
  GET_COMMENTS,
  DELETE_POST,
  GET_ERRORS,
} from "./types";
import axios from "axios";

export const getPosts = (dispatch) => {
  axios.get("/api/posts").then((res) => {
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

export const likePost = (dispatch, data) => {
  axios.put(`/api/posts/like`, data).then((res) => {
    getPosts(dispatch);
  });
};

export const deletePost = (dispatch, { id }) => {
  axios.delete(`/api/posts/delete/${id}`).then((res) => {
    getPosts(dispatch);
  });
};
