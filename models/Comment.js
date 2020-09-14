const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CommentSchema = new Schema({
  userName: {
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

  date: {
    type: Number,
    default: Date.now,
  },
  parentType: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    required: true,
  },
  OPid: {
    type: String,
    required: true,
  },
  depth: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

CommentSchema.add({
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

var autoPopulateChildren = function (next) {
  this.populate("comments");
  next();
};

CommentSchema.pre("find", autoPopulateChildren);

module.exports = Comment = mongoose.model("comment", CommentSchema);
