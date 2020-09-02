import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logOut } from "../../actions/authActions";

const LogOut = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    logOut(dispatch);
  };

  return (
    <>
      <Button onClick={handleLogOut} color="inherit">
        LogOut
      </Button>
    </>
  );
};

export default LogOut;
