const Posts = require("../models/postsModel");
const User = require("../models/userModel");
const Comments =require("../models/commentsModel")

const mongoose=require("mongoose")

const mongo=mongoose.mongo;
const session=mongoose.startSession;


const { postValidation, updateValidation } = require("../validation/postValid");

const getAllPosts = async (req, res) => {
  let post;
  try {
    post = await Posts.find().populate("user").populate("comments");
  } catch (err) {
    return console.log(err);
  }

  if (!post) {
    return res.status(500).json({ message: "post not found " });
  }

  return res.status(200).json({ post});
};

const createPost = async (req, res) => {
  const { title, description, category, date, image, user ,comments} = req.body;

  const {error}=postValidation(req.body)
  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  let post;

  try {
    post = new Posts({
      title,
      description,
      image,
      category,
      date: new Date(`${date}`),
      user,
      comments,
  
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.posts.push(post);
    await existingUser.save({ session });
    post = await post.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!post) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }
  return res.status(201).json({ post });
};

 const getPostById = async (req, res) => {
  const id = req.params.id;

  let post;

  try {
    post = await Posts.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!post) {
    return res.status(404).json({ message: "No post found" });
  }
  return res.status(200).json({ post });
};
const updatePost = async (req, res) => {
  const { error } = updateValidation(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  let post;
  try {
    post = await Posts.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      
    
    });
  } catch (error) {
    console.log(error);
  }
  if (!post) {
    return res.status(400).json("post not found");
  }
  return res.status(200).json(post);
};

 const deletePost = async (req, res) => {
  const id = req.params.id;
  let post;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    post = await Posts.findById(id).populate("user");
    post.user.posts.pull(post);
    await post.user.save({ session });
    post = await Posts.findByIdAndRemove(id);
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!post) {
    return res.status(500).json({ message: "Unable to delete" });
  }

  return res.status(200).json({ message: "Deleted Successfully" });
};




module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  
};
