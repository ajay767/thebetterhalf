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
      status: true,
      post,
      message: 'Post created successfully!',
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate([
      { path: 'comments' },
      { path: 'likes', select: 'userId' },
    ]);
    if (!post) {
      return next(new AppError('Post is unavailble', 400));
    }
    res.json({
      status: true,
      post,
    });
  } catch (err) {
    next(err);
  }
};

exports.getpostsofusers = async (req, res, next) => {
  try {
    let userId = req.params.id;
    if (!userId || userId == '0') userId = req.user._id;
    const post = await Post.find({
      userId,
    }).populate([{ path: 'comments' }, { path: 'likes', select: 'userId' }]);
    res.json({
      status: true,
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
