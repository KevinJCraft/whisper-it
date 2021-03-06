const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//  User Model
const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

// @route Post api/users
// @desc Register new user
// @access Public
router.post("/", (req, res) => {
  const { userName, password } = req.body;

  //validation
  if (!userName || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ userName }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      userName,
      password,
    });

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id, userName: user.userName },
            process.env.jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  userName: user.userName,
                },
              });
            }
          );
        });
      });
    });
  });
});

// @route GET api/users/profile
// @desc GET USer activity
// @access Public

router.get("/profile/:sort/:profileName", async (req, res) => {
  const profileName = req.params.profileName;
  const type = req.params.sort;
  let sort;
  if (type === "new") sort = { date: -1 };
  if (type === "top") sort = { likes: -1 };

  try {
    const user = await User.findOne({ userName: profileName });
    if (!user) throw "no user";
    const posts = await Post.find({ userName: profileName }).sort(sort);
    const comments = await Comment.find({ userName: profileName }).sort(sort);
    res.json({ posts, comments, profileName: profileName });
  } catch (error) {
    res.status(400).json({ msg: "user not found" });
  }
});

module.exports = router;
