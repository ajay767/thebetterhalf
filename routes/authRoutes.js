const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/one-tap-login", userController.oneTapLogin);
router.get("/profile", authController.protect, userController.getProfile);

module.exports = router;
