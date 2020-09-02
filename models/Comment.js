const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CommentSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  parentType: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: 0,
  },
  comments: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
