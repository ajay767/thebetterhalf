const friendController = require('./../controllers/friendController');
const authController = require('./../controllers/authController');

const express = require('express');
const router = express.Router();

router.use(authController.protect);

router.route('/').post(friendController.sendRequest);
router.route('/delete/:id').delete(friendController.sendRequest);
router.route('/accept/:id').get(friendController.acceptRequest);
router.route('/get-all-friend').get(friendController.getAllFriends);
router.route('/get-pending-friend').get(friendController.getAllPendingFriends);
router
  .route('/get-recommendation')
  .get(authController.protect, friendController.getRecommendation);

module.exports = router;
