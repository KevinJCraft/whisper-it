const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Post = require("../../models/Post");
const USer = require("../../models/User");
const User = require("../../models/User");

// @route GET api/posts
// @desc Get All posts
// @access Public
router.get("/:sort", (req, res) => {
  const type = req.params.sort;
  let sort;
  if (type === "new") sort = { date: -1 };
  if (type === "top") sort = { likes: -1 };
  Post.find()
    .sort(sort)
    .then((posts) => res.json(posts))
    .catch((error) => res.status(400).json({ msg: "posts not found" }));
});

// @route GET api/posts/one
// @des GET ONE post by id
// @access Public
router.get("/one/:id/:sort", async (req, res) => {
  const id = req.params.id;
  const sort = req.params.sort || "top";

  try {
    const post = await Post.findById(id).populate("comments");
    if (sort === "top") {
      post.comments.sort((a, b) => b.likes.length - a.likes.length);
    }
    if (sort === "new") {
      post.comments.sort((a, b) => b.date - a.date);
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ msg: "unable to get post" });
  }
});

// @route Post api/posts
// @desc Post a post
// @access Private
router.post("/", auth, async (req, res) => {
  const newPost = new Post({
    userName: req.body.userName,
    title: req.body.title,
    body: req.body.body,
    likes: [req.body.userName],
  });

  try {
    const savedPost = await newPost.save();
    const user = await User.findOne({ userName: savedPost.userName });
    user.posts.push(savedPost);
    user.save();
    res.json(savedPost);
  } catch (error) {
    res.status(400).json({ msg: "unable to post" });
  }
});

// @route DELETE api/posts/delete
// @desc DELETE a post
// @access Private
router.delete("/delete/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const postToDelete = await Post.findById(id);

    postToDelete.userName = "-deleted-";
    postToDelete.body = "-deleted-";
    postToDelete.deleted = true;
    if (postToDelete.comments.length > 0) {
      await postToDelete.save();
    } else {
      await postToDelete.delete();
    }
    res.json(postToDelete);
  } catch (error) {
    res.status(400).json({ msg: "unable to delete post" });
  }
});

// @route PUT api/posts/like
// @desc Like a post
// @access Public
router.put("/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);
    const userIndex = post.likes.indexOf(req.body.userName);
    if (userIndex === -1) {
      post.likes.push(req.body.userName);
    } else {
      post.likes.splice(userIndex, 1);
    }
    const newPost = await post.save();
    res.json(newPost);
  } catch (error) {
    res.status(400).json({ msg: "unable to like post" });
  }
});

module.exports = router;
