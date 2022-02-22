const Post = require('../models/postModel');
const AppError = require('../utils/AppError');

exports.createPost = async (req, res, next) => {
  try {
    const { poster, caption } = req.body;
    const userId = req.user._id;
    const post = await Post.create({
      userId,
      caption,
      poster,
    });
    res.json({
      status: 'Success',
      post,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getpostsofusers = async (req, res, next) => {
  try {
    let userId = req.params.id;
    if (!userId || userId == '0') userId = req.user._id;
    const post = await Post.find({
      userId,
    }).populate('comments');
    res.json({
      status: 'Success',
      posts: post,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post.userId != req.user._id) {
      return next(new AppError('Post can be deleted by used who created it!'));
    }
    await Post.findByIdAndDelete(postId);
    res.json({
      status: 'Successfully Delete',
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
