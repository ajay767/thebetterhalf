const Like = require('../models/likeModal');
const AppError = require('../utils/AppError');

exports.createLike = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id;
    console.log(postId, userId);
    if (!postId) {
      return next(new AppError('Post is Unavailble', 400));
    }
    const data = await Like.create({
      postId,
      userId,
    });
    res.json({
      status: 'Success',
      data,
    });
  } catch (err) {
    next(err);
  }
};
exports.removeLike = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id;
    if (!postId) {
      return next(new AppError('Post is Unavailble', 400));
    }
    await Like.deleteOne({
      postId,
      userId,
    });
    res.json({
      status: 'Success',
    });
  } catch (err) {
    next(err);
  }
};
