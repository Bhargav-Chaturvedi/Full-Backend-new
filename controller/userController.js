const asyncHandler = require("express-async-handler");

// @desc register user
// @routes POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User registered successfully" });
});

// @desc login user
// @routes POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User loggedin successfully" });
});

// @desc current user info
// @routes POST /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Current User" });
});

module.exports = { registerUser, loginUser, currentUser };
