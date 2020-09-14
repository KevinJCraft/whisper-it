import {
  GET_POST_AND_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
  LIKE_POST_AND_COMMENTS,
  LOADING_EXTENDED_COMMENTS,
  GET_ERRORS,
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
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
          id: "GET_POST_AND_COMMENTS_FAIL",
        },
      });
    });
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
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
          id: "ADD_COMMENT_FAIL",
        },
      });
    });
};

export const deleteComment = (dispatch, { id }) => {
  axios
    .delete(`/api/comments/delete/${id}`, tokenConfig())
    .then((res) => {
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
          id: "DELETE_COMMENT_FAIL",
        },
      });
    });
};

export const likeComment = (dispatch, data) => {
  axios
    .put(`/api/comments/like`, data, tokenConfig())
    .then((res) => {
      dispatch({
        type: LIKE_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
          id: "LIKE_COMMENT_FAIL",
        },
      });
    });
};

export const likePost = (dispatch, data) => {
  axios
    .put(`/api/posts/like`, data, tokenConfig())
    .then((res) => {
      dispatch({
        type: LIKE_POST_AND_COMMENTS,
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

export const getComment = (dispatch, id) => {
  axios
    .get(`/api/comments/${id}`)
    .then((res) =>
      dispatch({
        type: LOADING_EXTENDED_COMMENTS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
          id: "GET_COMMENT_FAIL",
        },
      });
    });
};
