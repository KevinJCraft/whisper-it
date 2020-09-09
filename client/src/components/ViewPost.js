import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostAndComments, likePost } from "../actions/commentActions";
import Comment from "./Comment";
import ReplyForm from "./ReplyForm";
import { Grid, Typography, Link, makeStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Delete from "./Delete";

TimeAgo.addLocale(en);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem 1rem 0 1rem",
  },
  title: {
    textDecoration: "none",
  },
  postTitleContainer: {
    flexGrow: 1,
  },
  postBody: {
    width: "90%",
    margin: "0 auto 1rem",
    background: "#80808029",
    padding: "1.2rem",
    borderRadius: "5px",
  },
}));

const ViewPost = () => {
  const { id } = useParams();
  const post = useSelector((state) => state.postAndComments);
  const isAuthenticated = useSelector((state) => state.auth);
  const userName = useSelector((state) => state.auth.user.userName);
  const dispatch = useDispatch();
  const timeAgo = new TimeAgo("en-US");
  const classes = useStyles();

  const getLikedStyle = () => {
    if (!isAuthenticated) return { display: "none" };
    if (post.likes.includes(userName)) return { color: "green", fill: "green" };
    return {};
  };

  const handleLike = () => {
    likePost(dispatch, { id: post._id, userName });
  };

  useEffect(() => {
    getPostAndComments(dispatch, id);
  }, [dispatch, id]);
  return (
    <>
      {post.title ? (
        <>
          <Grid className={classes.root} spacing={2} container direction="row">
            <Grid item>
              <Grid onClick={handleLike} item>
                <FavoriteIcon style={getLikedStyle()} />
                <Typography align="center">{post.likes?.length}</Typography>
              </Grid>
            </Grid>
            <Grid className={classes.postTitleContainer} item>
              <Typography variant="h6">{post?.title}</Typography>
              <Grid container justify="space-between">
                <Typography variant="caption">
                  {`posted ${timeAgo.format(post.date)} by `}{" "}
                  <Link to={`/user/profile/${post.userName}`}>
                    {post.userName}
                  </Link>
                </Typography>
                <Delete
                  typeToDelete="post"
                  userName={post.userName}
                  id={post._id}
                />
              </Grid>
              <br></br>
            </Grid>
          </Grid>
          <Typography className={classes.postBody} variant="subtitle1">
            {post?.body}
          </Typography>
          <ReplyForm
            OPid={id}
            parentType="post"
            parentId={id}
            parentDepth={0}
          />
          <h4>comments ({post?.numOfComments})</h4>
          {post.comments?.map((comment, index) => (
            <Comment key={index} comment={comment} OPid={id} />
          ))}
        </>
      ) : (
        <h1>hi</h1>
      )}
    </>
  );
};

export default ViewPost;
