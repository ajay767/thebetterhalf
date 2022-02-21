const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const upload = require("./../utils/multer");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/one-tap-login", userController.oneTapLogin);
router.get("/profile", authController.protect, userController.getProfile);
router.put("/profile", authController.protect, userController.update);
router.put(
  "/update-password",
  authController.protect,
  userController.updatePassword
);
router.put(
  "/upload-profile",
  authController.protect,
  userController.uploadProfile
);

router.get("/user/:id", authController.protect, userController.getUser);

module.exports = router;
