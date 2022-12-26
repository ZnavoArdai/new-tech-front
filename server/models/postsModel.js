const mongoose = require("mongoose");

const Schema = require("mongoose").Schema;

const posts = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  
 
  comments:[ {
    type: mongoose.Types.ObjectId,
    ref: "comments",
  }],
});

module.exports = mongoose.model("posts", posts);
