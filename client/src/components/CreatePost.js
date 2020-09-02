import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChatIcon from "@material-ui/icons/Chat";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../actions/postActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "15rem",
    fill: "#3f51b5",
  },
  form: {
    width: "80%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  formItem: {
    marginBottom: "1rem",
  },
}));

const INITIAL_STATE = {
  title: "",
  body: "",
};

const CreatePost = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const history = useHistory();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.user.userName);

  const classes = useStyles();

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title: state.title,
      body: state.body,
      userName: userName,
    };
    addPost(dispatch, newPost);
    setState(INITIAL_STATE);
    history.push("/");
  };
  return (
    <Grid container justify="center" alignItems="center">
      <ChatIcon className={classes.icon} />
      <form onSubmit={onSubmit} className={classes.form}>
        <TextField
          onChange={handleChange}
          id="title"
          type="text"
          label="Title"
          value={state.title}
          className={classes.formItem}
        />
        <TextField
          onChange={handleChange}
          id="body"
          label="Message"
          value={state.body}
          className={classes.formItem}
          multiline
          rows={4}
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Grid>
  );
};

export default CreatePost;
