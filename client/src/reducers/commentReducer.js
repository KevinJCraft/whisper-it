import { GET_COMMENTS, ADD_COMMENT } from "../actions/types";
import axios from "axios";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, [action.payload._id]: action.payload };
    case ADD_COMMENT:
      return {
        ...state,
        [action.payload.OPid]: recursiveAddComment(
          action.payload.parentId,
          state[action.payload.OPid],
          action.payload.newComment
        ),
      }; //start back here
    //action.payload has {OPid, newComment, parentId}
    default:
      return state;
  }
};

function recursiveAddComment(parentId, post, newComment) {
  if (post._id === parentId) {
    post.comments.unshift(newComment);
    return post;
  }
  const helper = (parentId, comments, newComment) => {
    if (!comments) return [];

    comments.forEach((comment) => {
      if (comment._id === parentId) {
        comment.comments.unshift(newComment);
      }
      comment.comments = helper(parentId, comment.comments, newComment);
    });

    return comments;
  };

  post.comments = helper(parentId, post.comments, newComment);
  return post;
}
