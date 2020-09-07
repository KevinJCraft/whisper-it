import { GET_COMMENTS, ADD_COMMENT } from "../actions/types";
import axios from "axios";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, [action.payload._id]: action.payload };
    case ADD_COMMENT:
      return state; //start back here
    //action.payload has {OPid, newComment, parentId}
    default:
      return state;
  }
};

function recursiveAddComment(parentId, comments, newComment) {
  if (!comments) return [];

  comments.forEach((comment) => {
    if (comment._id === parentId) {
      comment.comments.push(newComment);
    }
    recursiveAddComment(parentId, comment.comments, newComment);
  });
  return comments;
}
