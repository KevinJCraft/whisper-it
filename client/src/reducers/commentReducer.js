import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
} from "../actions/types";
import axios from "axios";
import { CardActions } from "@material-ui/core";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, [action.payload._id]: action.payload };
    case ADD_COMMENT:
      return {
        ...state,
        [action.payload.newComment.OPid]: recursiveAddComment(
          action.payload.newComment.parentId,
          state[action.payload.newComment.OPid],
          action.payload.newComment
        ),
      };
    case DELETE_COMMENT:
      const newComments = recursiveDeleteComment(
        action.payload,
        state[action.payload.OPid].comments
      );
      const newState = state;
      newState[action.payload.OPid].comments = newComments;
      return { ...newState };

    case LIKE_COMMENT: {
      const newComments = recursiveLikeComment(
        action.payload,
        state[action.payload.OPid].comments
      );
      const newState = state;
      newState[action.payload.OPid].comments = newComments;
      return { ...newState };
    }

    default:
      return state;
  }
};

function recursiveLikeComment(likedComment, comments) {
  if (!comments) return [];
  comments = comments.map((comment) => {
    if (comment._id === likedComment._id) {
      //likedComment doesn't have child comments so we take them from origional comment
      likedComment.comments = comment.comments;
      return likedComment;
    }
    comment.comments = recursiveLikeComment(likedComment, comment.comments);
    return comment;
  });
  return comments;
}

function recursiveDeleteComment(deletedComment, comments) {
  if (!comments) return [];
  comments = comments.map((comment) => {
    if (comment._id === deletedComment._id) {
      //deletedComment doesn't have child comments so we take them from origional comment
      deletedComment.comments = comment.comments;
      return deletedComment;
    }
    comment.comments = recursiveDeleteComment(deletedComment, comment.comments);
    return comment;
  });
  return comments;
}

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
