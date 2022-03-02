const chatController = require('../controllers/chatController');
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/create').post(authController.protect, chatController.createChat);
router.route('/get').post(authController.protect, chatController.getChats);

module.exports = router;
