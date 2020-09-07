import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../actions/postActions";
import {
  Card,
  CardHeader,
  Avatar,
  CardActions,
  Button,
  Collapse,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import Delete from "./Delete";

const useStyles = makeStyles((theme) => ({
  bodyStyle: {
    paddingLeft: "4rem",
    overflowWrap: "break-word",
  },
}));

const Post = ({ post }) => {
  const [expand, setExpand] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userName = useSelector((state) => state.auth.user.userName);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleLike = () => {
    likePost(dispatch, { id: post._id, userName });
  };

  const getLikedStyle = () => {
    if (!isAuthenticated) return { display: "none" };
    if (post.likes.includes(userName)) return { color: "green" };
    else return {};
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{post.userName[0]}</Avatar>}
        title={post.title}
        subheader={post.userName}
        onClick={toggleExpand}
      />
      <Collapse onClick={() => setExpand(false)} in={expand}>
        <CardContent className={classes.bodyStyle}>{post.body}</CardContent>
      </Collapse>
      <CardActions>
        <Button
          style={getLikedStyle()}
          onClick={handleLike}
          size="small"
          color="inherit"
        >
          like {post.likes.length}
        </Button>
        <Link to={`/comments/${post._id}`}>
          <Button size="small" color="inherit">
            comments
          </Button>
        </Link>
        <Delete typeToDelete="post" post={post} />
      </CardActions>
    </Card>
  );
};

export default Post;
