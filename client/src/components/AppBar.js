import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { CssBaseline, Button } from "@material-ui/core";
import Login from "./auth/Login";
import Register from "./auth/Register";
import LogOut from "./auth/LogOut";
import { useSelector } from "react-redux";

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
  welcomeMessage: {
    paddingRight: "3rem",
  },
}));

export default function AppBarHeader() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const classes = useStyles();
  const history = useHistory();

  const displayAuthOptions = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Login />
          <Register />
        </>
      );
    } else {
      return (
        <>
          <Typography className={classes.welcomeMessage}>
            Welcome {user.userName}
          </Typography>

          <Button onClick={() => history.push("/create")} color="inherit">
            New Post
          </Button>

          <LogOut />
        </>
      );
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar className={classes.appBarContainer}>
          <Typography variant="h6" className={classes.title}>
            Whisper-it
          </Typography>

          {displayAuthOptions()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
