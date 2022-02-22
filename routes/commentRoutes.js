const commentController = require('../controllers/commentController');
const AppError = require('../utils/AppError');
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/create')
  .post(authController.protect, commentController.createComment);

module.exports = router;
