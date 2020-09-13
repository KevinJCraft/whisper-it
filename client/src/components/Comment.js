import React, { useState } from "react";
import { Collapse, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import ReplyForm from "./ReplyForm";
import { likeComment } from "../actions/commentActions";
import { Link } from "react-router-dom";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);

const useStyles = makeStyles((theme) => ({
  root: {
    borderLeft: "2px lightgrey solid",
    flexWrap: "none",
    paddingLeft: "1rem",
    width: "98%",
    margtin: "auto",
  },
  commentSide: {
    padding: ".5rem",
  },
  bodyStyle: {
    paddingLeft: "4rem",
    overflowWrap: "break-word",
  },
  postedData: {
    overflowWrap: "break-word",
  },
}));

const Comment = ({ comment, OPid, recursive, maxDepth }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [replyModal, setReplyModal] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userName = useSelector((state) => state.auth.user.userName);
  const timeAgo = new TimeAgo("en-US");

  const toggleReplyModal = () => {
    setReplyModal(!replyModal);
  };

  const getButtonVisibility = () => {
    if (userName === comment.userName)
      return { display: "inline", marginLeft: ".5rem" };
    else return { display: "none" };
  };

  const handleLikeComment = () => {
    likeComment(dispatch, { id: comment._id, userName });
  };

  const getLikedStyle = () => {
    if (!isAuthenticated) return { display: "inline" };
    if (comment.likes.includes(userName)) return { color: "green" };
    else return {};
  };

  const getReplyStyle = () => {
    if (!isAuthenticated) return { display: "none" };
    else return { display: "inline", color: "blue", marginLeft: ".5rem" };
  };

  return (
    <>
      <Grid className={classes.root} container>
        <Grid xs={12} item className={classes.commentSide}>
          <Typography variant="caption" className={classes.postedData}>
            <Link to={`/user/profile/${comment.userName}`}>
              {comment.userName}
            </Link>{" "}
            {`${timeAgo.format(comment.date)}`}
          </Typography>
          <Typography className={classes.body} variant="body1">
            {comment.body}
          </Typography>

          <Grid item container>
            <Grid item>
              <Typography
                style={getLikedStyle()}
                onClick={handleLikeComment}
                variant="caption"
              >
                {`like(${comment.likes.length})`}
              </Typography>
              <Typography
                style={getReplyStyle()}
                onClick={toggleReplyModal}
                variant="caption"
              >
                {`reply(${comment.comments.length})`}
              </Typography>
              <Typography
                style={getButtonVisibility()}
                onClick={() => setDeleteModal(true)}
                color="secondary"
                variant="caption"
              >
                delete
              </Typography>
              <Collapse in={replyModal}>
                <ReplyForm
                  OPid={comment.OPid}
                  parentType="comment"
                  parentId={comment._id}
                  parentDepth={comment.depth}
                  setExpand={setReplyModal}
                />
              </Collapse>
              <DeleteModal
                typeToDelete="comment"
                userName={comment.userName}
                id={comment._id}
                modal={deleteModal}
                setModal={setDeleteModal}
              />
            </Grid>
          </Grid>
        </Grid>
        {recursive &&
          comment.comments.map((comment, index) => {
            if (comment.depth < maxDepth) {
              return (
                <Comment
                  recursive={true}
                  OPid={OPid}
                  comment={comment}
                  maxDepth={maxDepth}
                  key={index}
                />
              );
            } else if (comment.depth === maxDepth) {
              return (
                <Typography key={index}>
                  <Link to={`/comments/extended/${comment._id}`}>
                    {"...more"}
                  </Link>
                </Typography>
              );
            } else return null;
          })}
      </Grid>
    </>
  );
};

export default Comment;
