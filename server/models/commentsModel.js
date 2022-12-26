const mongoose = require("mongoose");

const Schema = require("mongoose").Schema;

const comments = new Schema({
  commentBody: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  postsComments: {
    type: mongoose.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("comments", comments);
