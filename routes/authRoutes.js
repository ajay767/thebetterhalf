const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/one-tap-login", userController.oneTapLogin);
router.get("/profile", authController.protect, userController.getProfile);
router.post("/profile", authController.protect, userController.update);
router.post(
  "/update-password",
  authController.protect,
  userController.updatePassword
);

module.exports = router;
