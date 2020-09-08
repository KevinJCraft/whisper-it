import React, { useState } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../actions/commentActions";

const useStyles = makeStyles((theme) => ({
  replyField: {
    width: "100%",
  },
}));

const ReplyForm = ({ parentDepth, setExpand, parentType, parentId, OPid }) => {
  const [state, setState] = useState("");
  const userName = useSelector((state) => state.auth.user.userName);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (e) => {
    setState(e.target.value);
  };
  const handleSubmitComment = (e) => {
    e.preventDefault();
    const comment = {
      body: state,
      userName: userName,
      parentType,
      parentId,
      OPid,
      parentDepth,
    };
    addComment(dispatch, comment);
    setState("");
    if (parentType === "comment") {
      setExpand(false);
    }
  };
  return (
    <Grid container justify="center">
      <Grid item xs={10}>
        <form>
          <TextField
            className={classes.replyfield}
            label="reply"
            multiline
            fullWidth
            rows={5}
            value={state}
            onChange={handleChange}
            variant="outlined"
          />
          <Button type="submit" onClick={handleSubmitComment}>
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default ReplyForm;
