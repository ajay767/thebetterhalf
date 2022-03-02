const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'User 1 cannot be null or empty'],
      ref: 'User',
    },
    user2: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'User 2 cannot be null or empty'],
      ref: 'User',
    },
    latestMessage: {
      type: String,
      required: [true, 'Latest Message is Mandatory'],
      default: '',
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
