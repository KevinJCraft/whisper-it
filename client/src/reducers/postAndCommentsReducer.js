import {
  GET_POST_AND_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
  LIKE_POST_AND_COMMENTS,
  CLEAR_POST_AND_COMMENTS,
  DELETE_POST,
} from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POST_AND_COMMENTS:
      return action.payload;
    case ADD_COMMENT:
      state.numOfComments = state.numOfComments + 1;
      return {
        ...recursiveAddComment(
          action.payload.newComment.parentId,
          state,
          action.payload.newComment
        ),
      };

    case DELETE_COMMENT:
      const newComments = recursiveDeleteComment(
        action.payload,
        state.comments
      );
      const newState = state;
      newState.comments = newComments;
      return { ...newState };

    case LIKE_COMMENT: {
      const newComments = recursiveLikeComment(action.payload, state.comments);
      const newState = state;
      newState.comments = newComments;
      return { ...newState };
    }

    case LIKE_POST_AND_COMMENTS: {
      return {
        ...state,
        likes: action.payload.likes,
      };
    }
    case CLEAR_POST_AND_COMMENTS:
      return {};

    case DELETE_POST: {
      return {
        ...state,
        body: "-deleted",
        userName: "deleted",
      };
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
