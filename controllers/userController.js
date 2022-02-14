const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return next(new AppError("Passwords do not match", 400));
    }
    const user = await User.create({
      username,
      email,
      password,
      confirmPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;
    res.status(201).json({
      status: "User Created",
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  console.log("GEEE");
  try {
    const { username, email, password } = req.body;
    if (!username && !email) {
      return next(new AppError("Must have username or email", 404));
    }
    const key = email ? "email" : "username";
    const value = email ? email : username;
    //console.log(value);
    const user = await User.findOne({
      [key]: value,
    }).select("+password");
    console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Invalid Email or Password"), 400);
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;
    res.status(200).json({
      status: "success",
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};
