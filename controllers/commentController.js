<<<<<<< HEAD
const Comment = require("../models/commentModel");
const AppError = require("../utils/AppError");
const APIFeatures = require("../utils/APIFeatures");

exports.createComment = async (req, res, next) => {
  try {
    const { text, postId } = req.body;
    const userId = req.user._id;
    const comment = await Comment.create({ text, userId, postId });
    res.json({
      status: true,
      comment,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getComment = async (req, res, next) => {
  try {
    const query = Comment.find({
      postId: req.params.id,
    }).populate("userId");
    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .paginate();
    const comments = await features.query;
    res.json({
      status: true,
      comments,
    });
  } catch (err) {
    next(err);
  }
};
=======
const Comment = require('../models/commentModel');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/APIFeatures');

exports.createComment = async (req, res, next) => {
  try {
    const { text, postId } = req.body;
    const userId = req.user._id;
    const comment = await Comment.create({ text, userId, postId });
    res.json({
      ststus: 'Success',
      comment,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getComment = async (req, res, next) => {
  try {
    const query = Comment.find({
      postId: req.params.id,
    });
    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .paginate();
    const comments = await features.query;
    res.json({
      status: 'Success',
      comments,
    });
  } catch (err) {
    next(err);
  }
};
>>>>>>> origin/comments
