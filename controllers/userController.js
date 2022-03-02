const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { promisify } = require("util");
const fileUploader = require("./../utils/fileUploader");
const jwt = require("jsonwebtoken");

exports.oneTapLogin = async (req, res, next) => {
  try {
    const token = req.body.token;

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (user === null) {
      console.log("error");
      return next(new AppError("Please login again", 404));
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

    if (!email_mobile_username || !password) {
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

    if (process.env.NODE_ENV === "development") {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      user.password = undefined;
      return res.status(200).json({
        status: true,
        user,
        token,
        message: "Logged in successfully",
      });
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
    const user = await User.findById(req.user.id).select("+password");
    if (
      req.body.currentPassword &&
      !(await user.correctPassword(req.body.currentPassword, user.password))
    ) {
      return next(new AppError("Your current password is wrong.", 401));
    }
    delete req.body.currentPassword;

    Object.keys(req.body).map((curr) => {
      user[curr] = req.body[curr];
    });

    await user.save();

    res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (
      !(await user.correctPassword(req.body.currentPassword, user.password))
    ) {
      return next(new AppError("Your current password is wrong.", 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ status: true, message: "Password updated!", token });
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
      return next(new AppError("Please login again", 404));
    }
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new AppError("Please login again", 404));
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return next("This account has been deleted!", 404);
    }

    return res
      .status(200)
      .json({ status: true, message: "success", data: user });
  } catch (error) {
    next(error);
  }
};

exports.uploadProfile = async (req, res, next) => {
  try {
    const user = req.user;
    user.profile = req.body.url;
    await user.save();
    res
      .status(200)
      .json({ status: true, message: "Profile image updated", data: user });
  } catch (error) {
    next(error);
  }
};

exports.searchUser = async (req, res, next) => {
  try {
    const searched_word = req.query.word;
    const document = await User.find({
      username: {
        $regex: "^" + searched_word,
      },
    });
    res.json({
      data: document,
      message: "Success",
    });
  } catch (err) {
    next(err);
  }
};
