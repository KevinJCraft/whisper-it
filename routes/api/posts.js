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
    .then((posts) => res.json(posts))
    .catch((err) => res.json());
});

// @route GET api/posts/one
// @des GET ONE post by id
// @access Public
router.get("/one/:id", (req, res) => {
  console.log(req.params.id);
  Post.findById(req.params.id)
    .populate("comments")
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ msg: "message not found" }));
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
  const id = req.params.id;
  Post.findById(id)
    .then((post) => post.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route PUT api/posts/like
// @desc Like a post
// @access Public
router.put("/like", (req, res) => {
  Post.findById(req.body.id)
    .then((post) => {
      const userName = req.body.userName;
      const userIndex = post.likes.indexOf(userName);
      const newLikes = [...post.likes];
      if (userIndex === -1) {
        newLikes.push(userName);
      } else {
        newLikes.splice(userIndex, 1);
      }
      post
        .updateOne({ $set: { likes: newLikes } })
        .then((response) => res.json({ success: true }));
    })
    .catch((err) => res.statusCode(404).json({ success: false }));
});

module.exports = router;
