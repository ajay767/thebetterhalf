const LikeController = require('../controllers/likeController');
const AppError = require('../utils/AppError');
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/create').post(authController.protect, LikeController.createLike);

module.exports = router;
