import {
  GET_POST_AND_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
  LIKE_POST_AND_COMMENTS,
} from "./types";
import axios from "axios";

export const getPostAndComments = (dispatch, id) => {
  axios
    .get(`/api/posts/one/${id}`)
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
    .post("/api/comments", comment)
    .then((res) => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteComment = (dispatch, { id }) => {
  axios.put(`/api/comments/delete/${id}`).then((res) => {
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    });
  });
};

export const likeComment = (dispatch, data) => {
  axios.put(`/api/comments/like`, data).then((res) => {
    dispatch({
      type: LIKE_COMMENT,
      payload: res.data,
    });
  });
};

export const likePost = (dispatch, data) => {
  axios.put(`/api/posts/like`, data).then((res) => {
    dispatch({
      type: LIKE_POST_AND_COMMENTS,
      payload: res.data,
    });
  });
};
