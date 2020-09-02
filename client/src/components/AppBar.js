import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { CssBaseline } from "@material-ui/core";
import Login from "./auth/Login";
import Register from "./auth/Register";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBarContainer: {
    width: "100%",
    maxWidth: 1200,
    margin: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar className={classes.appBarContainer}>
          <Typography variant="h6" className={classes.title}>
            Whisper-it
          </Typography>
          <Login />
          <Register />
        </Toolbar>
      </AppBar>
    </div>
  );
}
