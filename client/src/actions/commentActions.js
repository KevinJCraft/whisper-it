import { GET_COMMENTS, ADD_COMMENT } from "./types";
import axios from "axios";
import { getPosts } from "./postActions";

export const getPostAndComments = (dispatch, id) => {
  axios
    .get(`/api/posts/one/${id}`)
    .then((res) => {
      dispatch({
        type: GET_COMMENTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const addComment = (dispatch, comment) => {
  axios
    .post("/api/comments", comment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: ADD_COMMENT,
        payload: {
          newComment: res.data.newComment,
          OPid: res.data.OPid,
          parentId: res.data.parentId,
        },
      });
    })
    .catch((err) => console.log(err));
};
