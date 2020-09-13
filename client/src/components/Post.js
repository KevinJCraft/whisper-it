import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../actions/postActions";
import {
  Collapse,
  CardContent,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
TimeAgo.addLocale(en);

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    overflowWrap: "anywhere",
  },
  bodyStyle: {
    paddingLeft: "4rem",
  },
  iconSide: {
    padding: ".5rem",
    flex: "0 0 15px",
  },
  postSide: {
    padding: ".5rem",
    maxWidth: "calc(100% - 60px)",
    flex: "1",
  },
  postTitleContainer: {
    width: "100%",
  },
}));

const Post = ({ post }) => {
  const [expand, setExpand] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userName = useSelector((state) => state.auth.user.userName);
  const timeAgo = new TimeAgo("en-US");

  const handleLike = () => {
    likePost(dispatch, { id: post._id, userName });
  };

  const getLikedStyle = () => {
    if (!isAuthenticated) return { display: "none" };
    if (post.likes.includes(userName)) return { color: "green", fill: "green" };
    else return {};
  };

  return (
    <Grid container className={classes.root} direction="row">
      <Grid
        className={classes.iconSide}
        onClick={handleLike}
        item
        container
        justify="center"
        alignItems="center"
        direction="column"
      >
        <ArrowDropUpIcon fontSize="large" style={getLikedStyle()} />
        <Typography align="center">{post.likes.length}</Typography>
      </Grid>
      <Grid className={classes.postSide} item>
        <Link to={`/comments/${post._id}`}>
          <Typography className={classes.title} variant="h6">
            {post.title}
          </Typography>
        </Link>
        <Typography variant="caption">
          {`posted ${timeAgo.format(post.date)} by `}{" "}
          <Link to={`/user/profile/${post.userName}`}>{post.userName}</Link>
        </Typography>
        <Grid item container>
          <Grid item>
            <Typography variant="caption">
              <Link
                to={`/comments/${post._id}`}
              >{`    Comments(${post.numOfComments})`}</Link>
            </Typography>
          </Grid>
        </Grid>
        <Collapse onClick={() => setExpand(false)} in={expand}>
          <CardContent className={classes.bodyStyle}>{post.body}</CardContent>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default Post;
