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
      status: true,
      message: "User created",
      user,
      token,
    });
  } catch (err) {
    console.log(err, "from catch");
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { password, type, value } = req.body;
    if (!value) {
      return next(new AppError("Invalid credientials", 404));
    }

    const user = await User.findOne({
      [type]: value,
    }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Invalid Email or Password", 400));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;
    res.status(200).json({
      status: "success",
      user,
      token,
      message: "success",
    });
  } catch (err) {
    next(err);
  }
};
