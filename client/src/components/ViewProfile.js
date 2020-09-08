import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../actions/userActions";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    getUserProfile(dispatch, name);
  }, []);
  return (
    <>
      <h1>{profile.profileName}</h1>
      <h4>Posts</h4>
      {profile.posts.map((post, index) => (
        <div key={index}>
          <h5>{post.title}</h5>
          <h6>{post.body}</h6>
        </div>
      ))}
      <h4>Comments</h4>
      {profile.comments.map((comment, index) => (
        <div key={index}>
          <h6>{comment.body}</h6>
        </div>
      ))}
    </>
  );
};

export default ViewProfile;
