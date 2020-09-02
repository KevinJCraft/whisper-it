const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//  Post Model
const Comment = require("../../models/Comment");

// copy from posts to start back
