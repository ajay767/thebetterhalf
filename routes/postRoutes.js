const express = require('express');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

const router = express.Router();

router.route('/create').post(authController.protect, postController.createPost);
router
  .route('/getAllPosts/:id')
  .get(authController.protect, postController.getpostsofusers);
router
  .route('/deletePost/:id')
  .delete(authController.protect, postController.deletePost);

module.exports = router;
