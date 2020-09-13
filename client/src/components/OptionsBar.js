import { Button, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";

const OptionsBar = ({ sort, setSort }) => {
  const [sortButton, setSortButton] = useState(null);

  const handleClick = (event) => {
    setSortButton(event.currentTarget);
  };

  const handleClose = (event) => {
    setSort(event.currentTarget.textContent);
    setSortButton(null);
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {sort}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={sortButton}
        keepMounted
        open={Boolean(sortButton)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>top</MenuItem>
        <MenuItem onClick={handleClose}>new</MenuItem>
      </Menu>
    </>
  );
};

export default OptionsBar;
