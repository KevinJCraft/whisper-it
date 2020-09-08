import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostAndComments } from "../actions/commentActions";
import Comment from "./Comment";
import ReplyForm from "./ReplyForm";
import { Collapse } from "@material-ui/core";

const ViewPost = () => {
  const [expand, setExpand] = useState(true);
  const { id } = useParams();
  const commentState = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  useEffect(() => {
    getPostAndComments(dispatch, id);
  }, []);
  return (
    <>
      <h1>{commentState[id]?.title}</h1>
      <h2>{commentState[id]?.body}</h2>
      <Collapse in={expand}>
        <ReplyForm
          setExpand={setExpand}
          OPid={id}
          parentType="post"
          parentId={id}
          parentDepth={0}
        />
      </Collapse>
      {commentState[id]?.comments.map((comment, index) => (
        <Comment key={index} comment={comment} OPid={id} />
      ))}
    </>
  );
};

export default ViewPost;
