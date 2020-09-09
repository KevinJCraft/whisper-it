import React, { useState } from "react";
import { Button, Modal, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logOut } from "../../actions/authActions";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  logoutModal: {
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
    fontSize: "7rem",
    fill: "#3f51b5",
    padding: "2rem",
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

const LogOut = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLogOut = () => {
    logOut(dispatch);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} color="inherit">
        <ExitToAppIcon />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Paper className={classes.logoutModal}>
          <ExitToAppIcon className={classes.icon} />

          <Button onClick={handleLogOut} variant="contained" color="primary">
            Logout
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </Paper>
      </Modal>
    </>
  );
};

export default LogOut;
