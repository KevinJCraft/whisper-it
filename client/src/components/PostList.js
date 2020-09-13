import {
  Button,
  CircularProgress,
  Grid,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { CLEAR_POSTS } from "../actions/types";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getPosts } from "../actions/postActions";
import Post from "./Post";

const PostList = () => {
  const posts = useSelector((state) => state.posts);
  const [sortButton, setSortButton] = useState(null);
  const { sort } = useParams();
  const history = useHistory();

  const handleClick = (event) => {
    setSortButton(event.currentTarget);
  };

  const handleClose = (event) => {
    setSortButton(null);
  };

  const handleSetSort = (event) => {
    history.push(`/posts/${event.target.textContent}`);
    setSortButton(null);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getPosts(dispatch, sort);
    return () => dispatch({ type: CLEAR_POSTS });
  }, [dispatch, sort]);
  return posts ? (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ float: "right" }}
      >
        {sort}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={sortButton}
        keepMounted
        open={Boolean(sortButton)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSetSort}>top</MenuItem>
        <MenuItem onClick={handleSetSort}>new</MenuItem>
      </Menu>
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
