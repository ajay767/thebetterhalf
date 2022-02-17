const AppError = require("./../utils/AppError");
const { promisify } = require("util");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return next(new AppError("Please login to continue.", 401));
    }

    const decoded = await promisify(jwt.verify)(
      token.split(" ")[1],
      process.env.JWT_SECRET
    );
    if (!decoded.id) {
      return next(new AppError("Unauthorized request.", 401));
    }

    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
