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
  return posts.map((post, index) => <Post post={post} key={index} />);
};

export default PostList;
