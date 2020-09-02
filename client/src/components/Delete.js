import React, { useState } from "react";
import { Button, Modal, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../actions/postActions";

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
    fill: "red",
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

const Delete = ({ typeToDelete, post }) => {
  const [modal, setModal] = useState(false);
  const userName = useSelector((state) => state.auth.user.userName);
  const dispatch = useDispatch();

  const classes = useStyles();
  const handleClose = () => {
    setModal(false);
  };

  const handleDelete = () => {
    deletePost(dispatch, { id: post._id });
    setModal(false);
  };

  const getButtonVisibility = () => {
    if (post.userName === userName) return { display: "block" };
    else return { display: "none" };
  };

  return (
    <>
      <Button
        style={getButtonVisibility()}
        onClick={() => setModal(true)}
        color="inherit"
      >
        Delete
      </Button>
      <Modal open={modal} onClose={handleClose}>
        <Paper className={classes.loginModal}>
          <DeleteIcon className={classes.icon} />
          <Typography>{`Are you sure you want to delete this ${typeToDelete}.`}</Typography>
          <Button onClick={handleDelete} variant="contained" color="primary">
            Delete
          </Button>
          <Button onClick={() => setModal(false)}>Cancel</Button>
        </Paper>
      </Modal>
    </>
  );
};

export default Delete;
