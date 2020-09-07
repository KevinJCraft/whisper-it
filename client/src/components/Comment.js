import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  Collapse,
  Button,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Delete from "./Delete";
import { GET_COMMENTS } from "../actions/types";
import ReplyForm from "./ReplyForm";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "1rem",
  },
  bodyStyle: {
    paddingLeft: "4rem",
    overflowWrap: "break-word",
  },
}));

const Comment = ({ comment, OPid }) => {
  const [expand, setExpand] = useState(false);
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userName = useSelector((state) => state.auth.user.userName);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleLike = () => {
    //likePost(dispatch, { id: post._id, userName });
  };

  const getLikedStyle = () => {
    if (!isAuthenticated) return { display: "none" };
    if (comment.likes.includes(userName)) return { color: "green" };
    else return {};
  };

  const getdisplay = () => {
    if (!isAuthenticated) return { display: "none" };
    else return { display: "block" };
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar>{comment.userName[0]}</Avatar>}
          title={comment.body}
          subheader={comment.userName}
        />
        <Collapse in={expand}>
          <ReplyForm
            setExpand={setExpand}
            OPid={OPid}
            parentType="comment"
            parentId={comment._id}
          />
        </Collapse>
        <CardActions>
          <Button
            style={getLikedStyle()}
            onClick={handleLike}
            size="small"
            color="inherit"
          >
            like {comment.likes.length}
          </Button>
          <Button
            style={getdisplay()}
            onClick={toggleExpand}
            size="small"
            color="inherit"
          >
            reply
          </Button>
        </CardActions>
        {comment.comments.map((comment, index) => (
          <Comment OPid={OPid} key={index} comment={comment} />
        ))}
      </Card>
    </>
  );
};

export default Comment;
