import React, { useState, useEffect } from "react";
import { Card, CardHeader, Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/postActions";

const PostList = () => {
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    getPosts(dispatch);
  }, []);
  return posts
    ? posts.map((post, index) => (
        <Card key={index}>
          <CardHeader
            avatar={<Avatar>{post.userName[0]}</Avatar>}
            title={post.title}
            subheader={post.useName}
          />
        </Card>
      ))
    : "";
};

export default PostList;
