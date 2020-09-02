import React, { useState, useEffect } from "react";
import { Button, Modal, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { REGISER_SUCCESS } from "../../actions/types";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  loginModal: {
    position: "absolute",
    left: "50%",
    top: "20%",
    transform: "translate(-50%, -20%)",
    width: "100%",
    maxWidth: "400px",
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
  dupPassword: "",
  msg: null,
};

const Register = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleClose = () => {
    clearErrors(dispatch);
    setState(INITIAL_STATE);
  };

  const handleChange = (e) => {
    if (e.target.value.length < 15) {
      setState({ ...state, [e.target.id]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      userName: state.userName,
      password: state.password,
    };
    register(dispatch, newUser);
  };

  return (
    <>
      <Button
        onClick={() => setState({ ...state, open: true })}
        color="inherit"
      >
        Register
      </Button>
      <Modal open={state.open} onClose={handleClose}>
        <Paper className={classes.loginModal}>
          <AccountCircleIcon className={classes.icon} />
          <form onSubmit={onSubmit} className={classes.form}>
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
            <TextField
              onChange={handleChange}
              id="dupPassword"
              type="password"
              label="Re-enter Password"
              value={state.dupPassword}
              className={classes.formItem}
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
          {error.id === "REGISTER_FAIL" && (
            <Alert severity="error">{error.msg.msg}</Alert>
          )}
        </Paper>
      </Modal>
    </>
  );
};

export default Register;
