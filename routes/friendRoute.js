const friendController = require("./../controllers/friendController");
const authController = require("./../controllers/authController");

const express = require("express");
const router = express.Router();

router.use(authController.protect);

router.route("/").post(friendController.sendRequest);
router.route("/").get(friendController.sendRequest);

module.exports = router;
