import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostAndComments, likePost } from "../actions/commentActions";
import Comment from "./Comment";
import ReplyForm from "./ReplyForm";
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import DeleteModal from "./DeleteModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CLEAR_ERRORS, CLEAR_POST_AND_COMMENTS } from "../actions/types";

TimeAgo.addLocale(en);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "1000px",
    margin: "auto",
  },
  post: { padding: "1rem 1rem 0 1rem" },
  iconSide: {
    padding: ".5rem",
  },
  postSide: {
    padding: ".5rem",
    flexGrow: 1,
    maxWidth: "calc(100% - 60px)",
  },
  title: {
    display: "block",
    textDecoration: "none",
    overflowWrap: "anywhere",
  },
  postTitleContainer: {
    flexGrow: 1,
    width: "100%",
  },
  postBody: {
    maxWidth: "90%",
    margin: "0 auto 1rem",
    background: "#80808029",
    padding: "1.2rem",
    borderRadius: "5px",
    overflowWrap: "anywhere",
    whiteSpace: "pre-wrap",
  },
}));

const ViewPost = () => {
  const [modal, setModal] = useState(false);
  const [sortButton, setSortButton] = useState(null);
  const history = useHistory();
  const { id, sort } = useParams();
  const post = useSelector((state) => state.postAndComments);
  const error = useSelector((state) => state.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userName = useSelector((state) => state.auth.user.userName);
  const dispatch = useDispatch();
  const timeAgo = new TimeAgo("en-US");
  const classes = useStyles();

  const handleClick = (event) => {
    setSortButton(event.currentTarget);
  };

  const handleClose = (event) => {
    setSortButton(null);
  };

  const handleSort = (event) => {
    history.push(`/comments/${event.target.textContent}/${id}`);
    setSortButton(null);
  };

  const getLikedStyle = () => {
    if (!isAuthenticated) return { display: "none" };
    if (post.likes.includes(userName)) return { color: "green", fill: "green" };
    return {};
  };

  const handleLike = () => {
    likePost(dispatch, { id: post._id, userName });
  };

  const getButtonVisibility = () => {
    if (userName === post.userName) return { display: "inline" };
    else return { display: "none" };
  };

  useEffect(() => {
    if (error.id === "GET_POST_AND_COMMENTS_FAIL") history.push("/");
    getPostAndComments(dispatch, { id, sort });
    return () => {
      dispatch({ type: CLEAR_POST_AND_COMMENTS });
      dispatch({ type: CLEAR_ERRORS });
    };
  }, [dispatch, id, sort, error, history]);
  return (
    <div className={classes.root}>
      {post.title ? (
        <>
          <Grid className={classes.post} container direction="row">
            <Grid className={classes.iconSide} item>
              <Grid
                onClick={handleLike}
                item
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <ArrowDropUpIcon fontSize="large" style={getLikedStyle()} />
                <Typography align="center">{post.likes?.length}</Typography>
              </Grid>
            </Grid>
            <Grid className={classes.postSide} item>
              <Typography className={classes.title} variant="h6">
                {post?.title}
              </Typography>
              <Grid container justify="space-between">
                <Typography variant="caption">
                  {`posted ${timeAgo.format(post.date)} by `}{" "}
                  <Link to={`/user/profile/new/${post.userName}`}>
                    {post.userName}
                  </Link>
                </Typography>
                <Typography
                  style={getButtonVisibility()}
                  onClick={() => setModal(true)}
                  color="secondary"
                  variant="caption"
                >
                  delete
                </Typography>

                <DeleteModal
                  typeToDelete="post"
                  userName={post.userName}
                  id={post._id}
                  modal={modal}
                  setModal={setModal}
                />
              </Grid>
              <br></br>
            </Grid>
          </Grid>
          <Typography className={classes.postBody} variant="subtitle1">
            {post?.body}
          </Typography>
          {isAuthenticated ? (
            <ReplyForm
              OPid={id}
              parentType="post"
              parentId={id}
              parentDepth={0}
            />
          ) : null}
          <h4>comments ({post?.numOfComments})</h4>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{ float: "right" }}
          >
            {`sort: ${sort}`}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={sortButton}
            keepMounted
            open={Boolean(sortButton)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleSort}>top</MenuItem>
            <MenuItem onClick={handleSort}>new</MenuItem>
          </Menu>
          {post.comments?.map((comment, index) => (
            <Comment
              recursive={true}
              comment={comment}
              OPid={id}
              maxDepth={5}
              key={index}
            />
          ))}
        </>
      ) : (
        <Grid
          style={{ minHeight: "80vh" }}
          container
          justify="center"
          alignItems="center"
        >
          <CircularProgress />
        </Grid>
      )}
    </div>
  );
};

export default ViewPost;
