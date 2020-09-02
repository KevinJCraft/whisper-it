const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//  User Model
const User = require("../../models/User");

// @route Post api/users
// @desc Get All users
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
            config.get("jwtSecret"),
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

module.exports = router;
