const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.oneTapLogin = async (req, res, next) => {
  try {
    const token = req.body.token;

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return new AppError("Please login again", 404);
    }

    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      status: true,
      token: authToken,
      user,
      message: "Logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

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
      message: "Registered successfully!",
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
    const { password, email_mobile_username } = req.body;
    if (!email_mobile_username) {
      return next(new AppError("Invalid credientials", 404));
    }
    const user = await User.findOne({
      $or: [
        { email: email_mobile_username },
        { mobile: email_mobile_username },
        { username: email_mobile_username },
      ],
    }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Invalid Credientials", 400));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;
    res.status(200).json({
      status: true,
      user,
      token,
      message: "Logged in successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { email, password, confirmPassword, status, profile } = req.body;
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    if (req.user) {
      return res
        .status(200)
        .json({ status: true, message: "success", data: req.user });
    } else {
      return new AppError("Please login again", 404);
    }
  } catch (error) {
    next(error);
  }
};
