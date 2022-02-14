const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model("Friend", friendSchema);
module.exports = Friend;
