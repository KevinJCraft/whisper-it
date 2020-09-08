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
import { useSelector, useDispatch } from "react-redux";
import Delete from "./Delete";
import ReplyForm from "./ReplyForm";
import { likeComment } from "../actions/commentActions";

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
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userName = useSelector((state) => state.auth.user.userName);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleLikeComment = () => {
    likeComment(dispatch, { id: comment._id, userName });
  };

  const getLikedStyle = () => {
    if (!isAuthenticated) return { display: "none" };
    if (comment.likes.includes(userName)) return { color: "green" };
    else return {};
  };

  const getReplyStyle = () => {
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
            parentDepth={comment.depth}
          />
        </Collapse>
        <CardActions>
          <Button
            style={getLikedStyle()}
            onClick={handleLikeComment}
            size="small"
            color="inherit"
          >
            like {comment.likes.length}
          </Button>
          <Button
            style={getReplyStyle()}
            onClick={toggleExpand}
            size="small"
            color="inherit"
          >
            reply
          </Button>
          <Delete
            typeToDelete="comment"
            userName={comment.userName}
            id={comment._id}
          />
        </CardActions>
        {comment.comments.map((comment, index) => (
          <Comment OPid={OPid} key={index} comment={comment} />
        ))}
      </Card>
    </>
  );
};

export default Comment;
