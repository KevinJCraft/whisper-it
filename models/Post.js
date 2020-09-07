const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = require("./Comment").schema;

//Create Schema
const PostSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
