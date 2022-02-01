const User = require('../models/authModel');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    //console.log('HEY');
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return next(new AppError('Passwords do not match', 400));
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
      status: 'User Created',
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username && !email) {
      return next(new AppError('Must have username or email', 404));
    }
    const key = email ? 'email' : 'username';
    const value = email ? email : username;
    const user = User.findOne({
      [key]: value,
    });
  } catch (err) {}
};
