import React, { useEffect, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";

const Redirect = () => {
  const history = useHistory();
  useLayoutEffect(() => {
    history.push("/posts/new");
  });

  return null;
};

export default Redirect;
