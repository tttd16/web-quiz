const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const { genrateAccessToken, decodedAccessToken } = require('../utils/generateToken');
const userModel = require('../models/userModel');

const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({});
  res.json({ users });
});

/////
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase();
  const userExists = await userModel.findOne({ email: lowerCaseEmail });
  if (userExists) {
    return res.status(400).json({ message: 'User account already exists' });
  }
  const newUser = await userModel.create({ name, email: lowerCaseEmail, password });
  if (newUser) {
    return res.status(201).json({
      token: genrateAccessToken(newUser),
    });
  } else {
    return res.status(400).json({ message: 'Invalid input data' });
  }
});

//
const authLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase();
  const user = await userModel.findOne({ email: lowerCaseEmail });
  if (user && (await bcrypt.compare(password, user.password))) {
    return res.json({
      token: genrateAccessToken(user),
    });
  } else {
    return res.status(401).json({ message: 'Email or password is incorrect' });
  }
});

const profileUser = asyncHandler(async (req, res) => {
  const bearerToken = req.get('Authorization');
  const token = bearerToken.split(' ')[1];
  const decoded = decodedAccessToken(token);
  const { email } = decoded.data;
  const user = await userModel.findOne({ email });
  res.status(200).json(user);
});

//
const updateUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }
  const { name, email, currentPassword, newPassword } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;

  if (newPassword) {
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
  }
  const updatedUser = await user.save();
  return res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    photoURL: newUser.photoURL,
    isAdmin: updatedUser.isAdmin,
    token: genrateAccessToken(updatedUser._id),
  });
});

///
const updateUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params._id);
  if (!user) {
    res.status(404).json({ message: `Can't find users` });
  }
  const { name, email, isAdmin } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;
  user.isAdmin = isAdmin || user.isAdmin;
  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    password: updatedUser.password,
    photoURL: newUser.photoURL,
    isAdmin: updatedUser.isAdmin,
  });
});

//
const deleted = asyncHandler(async (req, res) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'Deletion failed' });
  }
  res.status(200).json({ message: 'Delete successfully' });
});

module.exports = {
  getUsers,
  register,
  authLogin,
  profileUser,
  updateUser,
  updateUserById,
  deleted,
};
