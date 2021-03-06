import React from "react";
import { Button, Modal, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { deletePost } from "../actions/postActions";
import { deleteComment } from "../actions/commentActions";

const useStyles = makeStyles((theme) => ({
  loginModal: {
    position: "absolute",
    left: "50%",
    top: "20%",
    transform: "translate(-50%, -20%)",
    width: "85vw",
    maxWidth: "400px",
    Height: "80vh",
    maxHeight: "600px",
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

const DeleteModal = ({ typeToDelete, modal, setModal, userName, id }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    setModal(false);
  };

  const handleDelete = () => {
    if (typeToDelete === "post") deletePost(dispatch, { id });
    if (typeToDelete === "comment") deleteComment(dispatch, { id });
    setModal(false);
  };

  return (
    <>
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

export default DeleteModal;
