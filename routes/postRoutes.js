const express = require("express");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

const router = express.Router();

router.route("/create").post(authController.protect, postController.createPost);
router
  .route("/getAllPosts/:id")
  .get(authController.protect, postController.getpostsofusers);
router
  .route("/deletePost/:id")
  .delete(authController.protect, postController.deletePost);

router.route("/getPost/:postId").get(postController.getPost);
router.route("/newsFeed").get(postController.newsFeed);

module.exports = router;
