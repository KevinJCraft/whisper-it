const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Comment = require("../../models/Comment");
const Post = require("../../models/Post");

// @route POST api/comments
// @des ADD One Comment
// @access Public

router.post("/", auth, async (req, res) => {
  const newComment = new Comment({
    userName: req.body.userName,
    body: req.body.body,
    OPid: req.body.OPid,
    parentType: req.body.parentType,
    parentId: req.body.parentId,
    depth: req.body.parentDepth + 1,
    likes: [req.body.userName],
  });
  newComment.save();

  if (req.body.parentType === "post") {
    try {
      const parentPost = await Post.findById(req.body.parentId);
      parentPost.comments.push(newComment);
      parentPost.numOfComments += 1;
      const newParentPost = await parentPost.save();
      res.json({ newComment });
    } catch (error) {
      console.log(error);
    }
  } else if (req.body.parentType == "comment") {
    try {
      //add to OP comment count
      const parentPost = await Post.findById(req.body.OPid);
      parentPost.numOfComments += 1;
      const newParentPost = await parentPost.save();
      //push comment into parent comment
      const parentComment = await Comment.findById(req.body.parentId);
      parentComment.comments.push(newComment);
      const newParentComment = await parentComment.save();
      res.json({ newComment });
    } catch (error) {
      console.log(error);
    }
  }
});

// @route PUT api/comments/delete
// @des Delete (remove content) One Comment
// @access Public

router.put("/delete/:id", auth, (req, res) => {
  const id = req.params.id;
  Comment.findById(id)
    .then((comment) => {
      comment.userName = "-deleted-";
      comment.body = "-deleted-";
      comment
        .save()
        .then((deletedComment) => res.json(deletedComment))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// @route PUT api/comments/like
// @des Like One Comment
// @access Public

router.put("/like", auth, (req, res) => {
  Comment.findById(req.body.id)
    .then((comment) => {
      const userName = req.body.userName;
      const userIndex = comment.likes.indexOf(userName);
      const newLikes = [...comment.likes];
      if (userIndex === -1) {
        newLikes.push(userName);
      } else {
        newLikes.splice(userIndex, 1);
      }
      comment.likes = newLikes;
      comment.save().then((updatedComment) => res.json(updatedComment));
    })
    .catch((err) => res.status(404).json({ success: false }));
});

router.get("/:id", async (req, res) => {
  Comment.findById(req.params.id)
    .populate("comments")
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ msg: "message not found" }));
});

module.exports = router;
