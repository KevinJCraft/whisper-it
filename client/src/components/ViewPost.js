import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostAndComments } from "../actions/commentActions";
import Comment from "./Comment";

const ViewPost = () => {
  const { id } = useParams();
  const commentState = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!commentState[id]) {
      getPostAndComments(dispatch, id);
    }
    console.log(commentState);
  }, []);
  return (
    <>
      <h1>{commentState[id]?.title}</h1>
      <h2>{commentState[id]?.body}</h2>
      {commentState[id]?.comments.map((comment, index) => (
        <Comment key={index} comment={comment} OPid={id} />
      ))}
    </>
  );
};

export default ViewPost;
