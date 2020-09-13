import {
  GET_POST_AND_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
  LIKE_POST_AND_COMMENTS,
  LOADING_EXTENDED_COMMENTS,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";

export const getPostAndComments = (dispatch, { id, sort }) => {
  axios
    .get(`/api/posts/one/${id}/${sort}`)
    .then((res) => {
      dispatch({
        type: GET_POST_AND_COMMENTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const addComment = (dispatch, comment) => {
  axios
    .post("/api/comments", comment, tokenConfig())
    .then((res) => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteComment = (dispatch, { id }) => {
  axios.delete(`/api/comments/delete/${id}`, tokenConfig()).then((res) => {
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    });
  });
};

export const likeComment = (dispatch, data) => {
  axios.put(`/api/comments/like`, data, tokenConfig()).then((res) => {
    dispatch({
      type: LIKE_COMMENT,
      payload: res.data,
    });
  });
};

export const likePost = (dispatch, data) => {
  axios.put(`/api/posts/like`, data, tokenConfig()).then((res) => {
    dispatch({
      type: LIKE_POST_AND_COMMENTS,
      payload: res.data,
    });
  });
};

export const getComment = (dispatch, id) => {
  axios
    .get(`/api/comments/${id}`)
    .then((res) =>
      dispatch({
        type: LOADING_EXTENDED_COMMENTS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
