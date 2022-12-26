const Comments =require("../models/commentsModel")
const Posts =require("../models/postsModel")


const mongoose=require("mongoose");
const userModel = require("../models/userModel");

const mongo=mongoose.mongo;
const session=mongoose.startSession;
const getAllcomments = async (req, res) => {
    let comment;
    try {
        comment= await Comments.find().populate("postsComments")
    } catch (err) {
      return console.log(err);
    }
  
    if (!comment) {
      return res.status(500).json({ message: "post not found " });
    }
  
    return res.status(200).json({ comment});
  };
const creatComment= async (req,res)=>{
   
    
    let isPostExist;
    try {
      isPostExist = await Posts.findById(req.params.id);
    } catch (err) {
      return console.log(err);
    }
  
    if (!isPostExist) {
      return res.status(404).json({ message: "post not found" });
    }
  
    let comment;
  
    try {
      comment = new Comments({
        commentBody:req.body.commentBody,
        postsComments:req.params.id,
        user:req.body.user,
        name:req.body.name,
        image:req.body.image
      });
  
      const session = await mongoose.startSession();
      session.startTransaction();
      isPostExist.comments.push(comment);
      await isPostExist.save({ session });
      comment = await comment.save({ session });
      session.commitTransaction();
    } catch (err) {
      return console.log(err);
    }
  
    if (!comment) {
      return res.status(500).json({ message: "Unexpected Error Occurred" });
    }
    return res.status(201).json({ comment });
  }
  const deleteComments = async (req, res) => {
    const id = req.params.id;
    let comment;
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      comment = await Comments.findById(id).populate("postsComments");
      comment.postsComments.comments.pull(comment);
      await comment.postsComments.save({ session });
      comment = await Comments.findByIdAndRemove(id);
      session.commitTransaction();
    } catch (err) {
      return console.log(err);
    }
    if (!comment) {
      return res.status(500).json({ message: "Unable to delete" });
    }
  
    return res.status(200).json({ message: "Deleted Successfully" });
  };
  
  const getCommentsByIdOfPost = async (req, res) => {
    const id = req.params.id;
  
    let post;
  
    try {
      post = await Posts.findById(id).populate("comments")
  
    } catch (err) {
      return console.log(err);
    }
    if (!post) {
      return res.status(404).json({ message: "No post found" });
    }
    return res.status(200).json({ post });
  };

  
  
  module.exports={
    creatComment,
    deleteComments,
    getAllcomments,
    getCommentsByIdOfPost

  }