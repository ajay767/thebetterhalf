const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    participants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    isPrivate: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: [true, "Chat cannot be created without name"],
    },
    photo: String,
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
