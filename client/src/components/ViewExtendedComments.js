import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComment } from "../actions/commentActions";
import Comment from "./Comment";

const ViewExtendedComments = () => {
  const comment = useSelector((state) => state.extendedComment);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getComment(dispatch, id);
  }, [dispatch, id]);

  const display = () => {
    if (comment.body)
      return (
        <Comment
          recursive={true}
          comment={comment}
          OPid={comment.OPid}
          maxDepth={10}
        />
      );
    else return <h1>Hi</h1>;
  };
  return display();
};

export default ViewExtendedComments;
