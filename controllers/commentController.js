const Comment = require('../models/commentModel');
const AppError = require('../utils/AppError');

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
