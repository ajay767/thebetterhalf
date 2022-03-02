const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    media: {
      type: String,
      trim: true,
      default: "",
    },
    chatId: {
      type: mongoose.Schema.ObjectId,
      ref: "Chat",
      index: true,
      required: [
        true,
        "Chatid is must Please make a chat between these 2 users",
      ],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
