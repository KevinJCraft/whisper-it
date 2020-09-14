import React, { useState } from "react";
import { Button, Modal, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/authActions";
import Alert from "@material-ui/lab/Alert";
import useFormValidation from "../../hooks/useFormValidation/useFormValidation";
import { CLEAR_AUTH_ERRORS } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  registerModal: {
    position: "absolute",
    left: "50%",
    top: "20%",
    transform: "translate(-50%, -20%)",
    width: "90%",
    maxWidth: "400px",
    height: "85vh",
    maxHeight: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 1rem",
  },
  icon: {
    fontSize: "7rem",
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
  userName: "",
  password: "",
  dupPassword: "",
};

const Register = () => {
  const [open, setOpen] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    setValues,
    errors,
  } = useFormValidation(INITIAL_STATE, tryRegister);

  const handleClose = () => {
    dispatch({ type: CLEAR_AUTH_ERRORS });
    setValues(INITIAL_STATE);
    setOpen(false);
  };

  function tryRegister() {
    const newUser = {
      userName: values.userName,
      password: values.password,
    };
    register(dispatch, newUser);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} color="inherit">
        Register
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Paper className={classes.registerModal}>
          <AccountCircleIcon className={classes.icon} />
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              onChange={handleChange}
              id="userName"
              name="user name"
              type="text"
              label="User Name"
              value={values.userName}
              className={classes.formItem}
              onBlur={handleBlur}
              error={errors.userName ? true : false}
              helperText={errors.userName}
            />
            <TextField
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              label="Password"
              value={values.password}
              className={classes.formItem}
              onBlur={handleBlur}
              error={errors.password ? true : false}
              helperText={errors.password}
            />
            <TextField
              onChange={handleChange}
              id="dupPassword"
              name="password"
              type="password"
              label="Re-enter Password"
              value={values.dupPassword}
              className={classes.formItem}
              onBlur={handleBlur}
              error={errors.dupPassword ? true : false}
              helperText={errors.dupPassword}
            />
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </form>
          {error && <Alert severity="error">{error}</Alert>}
        </Paper>
      </Modal>
    </>
  );
};

export default Register;
