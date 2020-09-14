import { makeStyles, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_ERRORS } from "../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const ErrorSnackbar = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const classes = useStyles();

  const handleClose = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  return (
    <div className={classes.root}>
      <Snackbar
        open={Boolean(error.status)}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          {`Request Failed(${error.status}): ${error.msg}`}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ErrorSnackbar;
