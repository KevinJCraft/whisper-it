const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//  Post Model
const Comment = require("../../models/Comment");
const Post = require("../../models/Post");

// copy from posts to start back
router.post("/", (req, res) => {
  const newComment = new Comment({
    userName: req.body.userName,
    body: req.body.body,
  });
  newComment.save();

  if (req.body.parentType === "post") {
    Post.findById(req.body.parentId)
      .then((post) => {
        post.comments.push(newComment);
        post
          .save()
          .then((response) =>
            res.json({
              parentId: response._id,
              newComment,
              OPid: req.body.OPid,
            })
          )
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else if (req.body.parentType == "comment") {
    Comment.findById(req.body.parentId)
      .then((comment) => {
        comment.comments.push(newComment);
        comment
          .save()
          .then((response) => {
            console.log(req.body.OPid);
            res.json({
              parentId: response._id,
              newComment,
              OPid: req.body.OPid,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;
