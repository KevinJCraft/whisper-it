import React, { useState, useEffect } from "react";
import { Card, CardHeader, Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/postActions";
import Post from "./Post";

const PostList = () => {
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    getPosts(dispatch);
  }, []);
  return posts.map((post, index) => <Post post={post} key={index} />);
};

export default PostList;
