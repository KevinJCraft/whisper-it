const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    uniqure: true,
  },
  password: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("user", UserSchema);
