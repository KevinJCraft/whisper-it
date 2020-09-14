import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../actions/userActions";
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  Button,
  Menu,
  MenuItem,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { CLEAR_PROFILE } from "../actions/types";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);

const useStyles = makeStyles(() => ({
  root: {},
  name: {
    textAlign: "center",
  },
  title: {
    overflowWrap: "anywhere",
  },
  bodyStyle: {
    paddingLeft: "4rem",
  },
  iconSide: {
    padding: ".5rem",
    flex: "0 0 51px",
  },
  postSide: {
    padding: ".5rem",
    maxWidth: "calc(100% - 60px)",
    flex: "1",
  },
  postTitleContainer: {
    width: "100%",
  },
  body: {
    whiteSpace: "pre-wrap",
  },
}));

const ViewProfile = () => {
  const [sortButton, setSortButton] = useState(null);
  const [view, setView] = useState({
    button: null,
    comments: true,
    posts: true,
    type: "both",
  });
  const dispatch = useDispatch();
  const { name, sort } = useParams();
  const history = useHistory();
  const profile = useSelector((state) => state.profile);
  const error = useSelector((state) => state.error);
  const classes = useStyles();
  const timeAgo = new TimeAgo("en-US");

  const handleClick = (event) => {
    setSortButton(event.currentTarget);
  };

  const handleOpenViewOptions = (event) => {
    setView({ ...view, button: event.currentTarget });
  };

  const handleClose = (event) => {
    setSortButton(null);
    setView({ ...view, button: null });
  };

  const handleSort = (event) => {
    history.push(`/user/profile/${event.target.textContent}/${name}`);
    setSortButton(null);
  };

  const handleSetView = (event) => {
    if (event.target.textContent === "both")
      setView({
        ...view,
        posts: true,
        comments: true,
        button: null,
        type: "both",
      });
    if (event.target.textContent === "comments")
      setView({
        ...view,
        posts: false,
        comments: true,
        button: null,
        type: "comments",
      });
    if (event.target.textContent === "posts")
      setView({
        ...view,
        posts: true,
        comments: false,
        button: null,
        type: "posts",
      });
  };

  useEffect(() => {
    if (error.id === "GET_USER_PROFILE_FAIL") history.push("/");
    getUserProfile(dispatch, { name, sort });
    return () => dispatch({ type: CLEAR_PROFILE });
  }, [dispatch, name, error, history, sort]);

  return profile.profileName ? (
    <div style={{ maxWidth: "1000px", margin: "auto" }}>
      <h1 className={classes.name}>{profile.profileName}</h1>
      <Button
        aria-controls="sort"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ float: "right" }}
      >
        {`sort: ${sort}`}
      </Button>
      <Menu
        id="sort"
        anchorEl={sortButton}
        keepMounted
        open={Boolean(sortButton)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSort}>top</MenuItem>
        <MenuItem onClick={handleSort}>new</MenuItem>
      </Menu>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpenViewOptions}
        style={{ float: "right" }}
      >
        {`view: ${view.type}`}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={view.button}
        keepMounted
        open={Boolean(view.button)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSetView}>both</MenuItem>
        <MenuItem onClick={handleSetView}>posts</MenuItem>
        <MenuItem onClick={handleSetView}>comments</MenuItem>
      </Menu>
      <div style={{ marginTop: "3rem" }}>
        {view.posts && (
          <>
            <h4>Posts</h4>
            {profile.posts.map((post, index) => (
              <div key={index}>
                <Divider variant="middle" />
                <Grid container className={classes.root} direction="row">
                  <Grid
                    className={classes.iconSide}
                    item
                    container
                    justify="flex-start"
                    alignItems="center"
                    direction="column"
                  >
                    <Typography align="center">{post.likes.length}</Typography>
                  </Grid>
                  <Grid className={classes.postSide} item>
                    <Link to={`/comments/top/${post._id}`}>
                      <Typography className={classes.title} variant="h6">
                        {post.title}
                      </Typography>
                    </Link>
                    <Typography variant="caption">
                      {`posted ${timeAgo.format(post.date)} `}{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            ))}
          </>
        )}

        {view.comments && (
          <>
            <h4>Comments</h4>
            {profile.comments.map((comment, index) => (
              <Box style={{ margin: "1rem" }} key={index}>
                <Divider variant="middle" />
                <Grid xs={12} item className={classes.commentSide}>
                  <Typography variant="caption" className={classes.postedData}>
                    {`${timeAgo.format(comment.date)}`}
                  </Typography>
                  <Typography className={classes.body} variant="body1">
                    {comment.body}
                  </Typography>
                </Grid>
                <Link to={`/comments/top/${comment.OPid}`}>
                  <Typography>see more</Typography>
                </Link>
              </Box>
            ))}
          </>
        )}
      </div>
    </div>
  ) : (
    <Grid
      style={{ minHeight: "80vh" }}
      container
      justify="center"
      alignItems="center"
    >
      <CircularProgress />
    </Grid>
  );
};

export default ViewProfile;
