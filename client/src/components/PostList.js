import React, { useState, useEffect } from "react";
import { Card, CardHeader, Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/postActions";

const PostList = () => {
  const posts = [{ userName: "Kevin", title: "this", body: "that" }];
  console.log("insie", posts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
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
