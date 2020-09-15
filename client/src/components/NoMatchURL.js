import { Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles(() => ({
  root: {
    minHeight: "80vh",
  },
}));

const NoMatchURL = () => {
  const classes = useStyle();

  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography align="center" variant="h2">
          404
        </Typography>
        <Typography variant="h5">"You think you're better than me?"</Typography>
        <Typography variant="body1">-me</Typography>
        <Typography variant="body2">
          ... usually to someone better than me
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NoMatchURL;
