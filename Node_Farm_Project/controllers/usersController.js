const User = require("../models/userModel");
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res,next) => {    
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    result: users.length,
    users
  });
});
exports.getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: 'Request for a User has been received!',
  });
};
exports.createUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: `Received POST request to create a User`,
  });
};
exports.updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: `Received PATCH request for User`,
  });
};
exports.deleteUser = (req, res) => {
  res.status(201).json({
    status: 'success',
    result: `Received DELETE request for User`,
  });
};
