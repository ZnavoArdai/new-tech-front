const { required, exist } = require("@hapi/joi");
const users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  registerValidation,
  loginValidation,
} = require("../validation/userValid");

const register = async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const emailExist = await users.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(201).json({ massage: "email already exist" });
  }
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new users({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    image:req.body.image,
    posts: [],
    comments:[]
  });
  try {
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const existUser = await users.findOne({ email: req.body.email });
  if (!existUser) {
    return res.status(404).json({ massage: "user not found" });
  }

  const comperedPassword = bcrypt.compareSync(
    req.body.password,
    existUser.password
  );

  if (!comperedPassword) {
    return res.status(400).json({ massage: "password invalid" });
  }

  return res
    .status(200)
    .json({ id: existUser.id,name: existUser.name,image: existUser.image, massage: "login successfully" });
};
const getAllUsers = async (req, res) => {
  let allUsaers;
  try {
    allUsaers = await users.find();
  } catch (error) {
    console.log(error);
  }

  if (!allUsaers) {
    return res.status(400).json("post not found");
  }

  if (allUsaers.length == 0) {
    return res.status(400).json("pos collection empty");
  }

  return res.status(200).json({ allUsaers });
};
const getUserById = async (req, res) => {
  let user;
  let id=req.params.id
  try {
    user = await users.findById(id).populate("posts");
  } catch (error) {
    console.log(error);
  }

  if (!user) {
    return res.status(400).json("post not found");
  }

  return res.status(200).json({user});
};
const client = require('twilio')(process.env.AC_SSID, process.env.SMS_AUTH);

const sendSmsMessage=()=>{
  client.messages.create({
    body: 'your account is connected to new tech',
    to: '+9720542379824',
    from: '+12058581615'
 }).then(message => console.log(message))
   .catch(error => console.log(error))
}
module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  sendSmsMessage
};
