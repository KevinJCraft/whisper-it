const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

//  User Model
const User = require("../../models/User");

// @route POST api/auth
// @desc Auth user
// @access Public
router.post("/", (req, res) => {
  const { userName, password } = req.body;

  //validation
  if (!userName || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ userName }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      console.log(isMatch);
      if (!isMatch) {
        return res.status(400).json({ msg: "invalid credentials" });
      }
      jwt.sign(
        { id: user.id },
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

// @route GET api/auth/user
// @desc Get user date
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
