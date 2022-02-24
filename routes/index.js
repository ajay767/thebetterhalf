const authRouter = require('./authRoutes.js');
const friendRouter = require('./friendRoute');
const s3Router = require('./s3Routes');
const postRouter = require('./postRoutes');
const commentRouter = require('./commentRoutes');
const likeRouter = require('./likeRoutes');

module.exports = {
  authRouter,
  friendRouter,
  s3Router,
  postRouter,
  commentRouter,
  likeRouter,
};
