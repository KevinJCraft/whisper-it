import React, { useState } from "react";
import { Button, Modal, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions";
import Alert from "@material-ui/lab/Alert";
import { CLEAR_AUTH_ERRORS } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  loginModal: {
    position: "absolute",
    left: "50%",
    top: "20%",
    transform: "translate(-50%, -20%)",
    width: "90%",
    maxWidth: "400px",
    height: "80vh",
    maxHeight: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 1rem",
  },
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
  open: false,
  userName: "",
  password: "",
  rememberMe: false,
};

const Login = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const classes = useStyles();

  const handleClose = () => {
    dispatch({ type: CLEAR_AUTH_ERRORS });
    setState(INITIAL_STATE);
  };

  const handleChange = (e) => {
    if (e.target.value.length < 15) {
      setState({ ...state, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      userName: state.userName,
      password: state.password,
    };
    login(dispatch, newUser);
  };

  return (
    <>
      <Button
        onClick={() => setState({ ...state, open: true })}
        color="inherit"
      >
        Login
      </Button>
      <Modal open={state.open} onClose={handleClose}>
        <Paper className={classes.loginModal}>
          <AccountCircleIcon className={classes.icon} />
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              onChange={handleChange}
              id="userName"
              type="text"
              label="User Name"
              value={state.userName}
              className={classes.formItem}
            />
            <TextField
              onChange={handleChange}
              id="password"
              type="password"
              label="Password"
              value={state.password}
              className={classes.formItem}
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
          {error && <Alert severity="error">{error}</Alert>}
        </Paper>
      </Modal>
    </>
  );
};

export default Login;
