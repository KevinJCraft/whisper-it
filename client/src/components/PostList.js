import { CircularProgress, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/postActions";
import OptionsBar from "./OptionsBar";
import Post from "./Post";

const PostList = () => {
  const posts = useSelector((state) => state.posts);
  const [sort, setSort] = useState("new");

  const dispatch = useDispatch();
  useEffect(() => {
    getPosts(dispatch, sort);
  }, [dispatch, sort]);
  return posts ? (
    <>
      <OptionsBar sort={sort} setSort={setSort} />
      {posts.map((post, index) => (
        <Post post={post} key={index} />
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

export default PostList;
