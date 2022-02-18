const friendController = require('./../controllers/friendController');
const authController = require('./../controllers/authController');

const express = require('express');
const router = express.Router();

router.use(authController.protect);

router.route('/').post(friendController.sendRequest);
router.route('/accept/:id').post(friendController.acceptRequest);
router.route('/').get(friendController.sendRequest);
router.route('/getallFriends').get(friendController.getAllFriends);
router.route('/getPendingFriends').get(friendController.getAllPendingFriends);

module.exports = router;
