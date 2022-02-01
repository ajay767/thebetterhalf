const express = require('express');
const authController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', authController.signup);

module.exports = router;
