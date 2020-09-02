import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardActions,
  Button,
  Collapse,
  CardContent,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bodyStyle: {
    paddingLeft: "4rem",
  },
}));

const Post = ({ post }) => {
  const [expand, setExpand] = useState(false);
  const classes = useStyles();
  const toggleExpand = () => {
    setExpand(!expand);
  };
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{post.userName[0]}</Avatar>}
        title={post.title}
        subheader={post.useName}
        onClick={toggleExpand}
      />
      <Collapse onClick={() => setExpand(false)} in={expand} unmountOnExit>
        <CardContent className={classes.bodyStyle}>{post.body}</CardContent>
      </Collapse>
      <CardActions>
        <Button size="small" color="inherit">
          like
        </Button>
        <Button size="small" color="inherit">
          comments
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
