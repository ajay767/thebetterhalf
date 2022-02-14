const AppError = require("./../utils/AppError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(new AppError("Please login to continue.", 401));
    }

    const id = jwt.decode(token, process.env.JWT_SECRET);
    if (!id) {
      return next(new AppError("Unauthorized request.", 401));
    }

    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
