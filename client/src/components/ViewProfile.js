import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../actions/userActions";
import Post from "./Post";
import Comment from "./Comment";
import { Typography, Box, Grid, CircularProgress } from "@material-ui/core";
import { CLEAR_PROFILE } from "../actions/types";
const ViewProfile = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    getUserProfile(dispatch, name);
    return () => dispatch({ type: CLEAR_PROFILE });
  }, [dispatch, name]);
  return profile.profileName ? (
    <>
      <h1>{profile.profileName}</h1>
      <h4>Posts</h4>
      {profile.posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
      <h4>Comments</h4>
      {profile.comments.map((comment, index) => (
        <Box style={{ marginTop: "1rem" }} key={index}>
          <Comment recursive={false} comment={comment} />
          <Link to={`/comments/${comment.OPid}`}>
            <Typography>see more</Typography>
          </Link>
        </Box>
      ))}
    </>
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

export default ViewProfile;
