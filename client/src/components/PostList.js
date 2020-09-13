import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/postActions";
import Post from "./Post";

const PostList = () => {
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    getPosts(dispatch);
  }, [dispatch]);
  return posts ? (
    posts.map((post, index) => <Post post={post} key={index} />)
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

export default PostList;
