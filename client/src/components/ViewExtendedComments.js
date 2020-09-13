import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComment } from "../actions/commentActions";
import Comment from "./Comment";
import { CircularProgress, Grid } from "@material-ui/core";

const ViewExtendedComments = () => {
  const comment = useSelector((state) => state.extendedComment);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getComment(dispatch, id);
  }, [dispatch, id]);

  return comment.userName ? (
    <Comment recursive comment={comment} OPid={comment.OPid} maxDepth={10} />
  ) : (
    <Grid
      style={{ minHeight: "80vh" }}
      container
      justify="center"
      alignItems="center"
    >
      <CircularProgress />
    </Grid>
  );
};

export default ViewExtendedComments;
