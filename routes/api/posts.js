const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//  Post Model
const Post = require("../../models/Post");

// @route GET api/posts
// @desc Get All posts
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts));
});

// @route Post api/posts
// @desc Post a post
// @access Private
router.post("/", (req, res) => {
  const newPost = new Post({
    userName: req.body.userName,
    title: req.body.title,
    body: req.body.body,
  });

  newPost
    .save()
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

// @route DELETE api/posts/delete
// @desc DELETE a post
// @access Private
router.delete("/delete/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => post.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route PUT api/posts/like
// @desc Like a post
// @access Public
router.put("/like/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) =>
      post
        .updateOne({ $set: { likes: post.likes + 1 } })
        .then(() => res.json({ success: true }))
    )
    .catch((err) => res.statusCode(404).json({ success: false }));
});

module.exports = router;
