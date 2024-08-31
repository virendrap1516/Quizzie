const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        errorMessage: {
          name: "Invalid name",
          email: "Invalid email",
          password: "Weak password",
          confirmPassword: "password doesn’t match",
        },
      });
    }
    if (confirmPassword != password) {
      return res.status(400).json({
        errorMessage: {
          confirmPassword: "password doesn’t match",
        },
      });
    }

    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      return res
        .status(409)
        .json({ errorMessage: { name: "User already exists" } });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// Login User
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        errorMessage: {
          email: "Please enter username",
          password: "Please enter password",
        },
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        errorMessage: {
          email: "Please enter valid username and password",
          password: "Please enter valid username and password",
        },
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        errorMessage: {
          email: "Please enter valid username and password",
          password: "Please enter valid username and password",
        },
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({
      success: true,
      token,
      userId: user._id,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Get User Detail
const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res
      .status(200)
      .json({ success: true, name: user.name, userId: user._id, user });
  } catch (error) {
    next(error);
  }
};

// Logout User
const logoutUser = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Successfully Logged Out",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getUserDetails, logoutUser };
