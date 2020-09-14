import {
  GET_POSTS,
  ADD_POST,
  LIKE_POST,
  DELETE_POST,
  GET_ERRORS,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { createBrowserHistory } from "history";

export const getPosts = (dispatch, sort) => {
  axios
    .get(`/api/posts/${sort}`)
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data.msg);
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
          id: "GET_POSTS_FAIL",
        },
      });
    });
};

export const addPost = (dispatch, post) => {
  axios
    .post("/api/posts", post, tokenConfig())
    .then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
          id: "ADD_POST_FAIL",
        },
      });
    });
};

export const likePost = (dispatch, data) => {
  axios
    .put(`/api/posts/like`, data, tokenConfig())
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
          id: "LIKE_POST_FAIL",
        },
      });
    });
};

export const deletePost = (dispatch, { id }) => {
  axios
    .delete(`/api/posts/delete/${id}`, tokenConfig())
    .then((res) => {
      dispatch({
        type: DELETE_POST,
        payload: res.data,
      });
      createBrowserHistory().push("/");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
          id: "DELETE_POST_FAIL",
        },
      });
    });
};
