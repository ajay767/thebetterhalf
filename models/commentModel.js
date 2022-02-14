const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Comment cannot be created without text"],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
