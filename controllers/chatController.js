const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const AppError = require('../utils/AppError');

exports.createChat = async (req, res, next) => {
  try {
    const user1 = req.user._id;
    const user2 = req.body.reciever;
    if (user1 == user2) {
      return next(new AppError('Both User cannot be same', 400));
    }
    const message = req.body.message;
    const media = req.body.media;
    const chat = await Chat.findOne({
      $or: [
        {
          user1,
          user2,
        },
        {
          user1: user2,
          user2: user1,
        },
      ],
    });
    let chatId;
    if (chat) {
      chatId = chat._id;
    } else {
      const newChat = await Chat.create({
        user1,
        user2,
      });
      chatId = newChat._id;
    }
    const sender = user1;
    const reciever = user2;
    const newMessage = await Message.create({
      chatId,
      sender,
      reciever,
      message,
      media,
    });
    res.json({
      status: 'Success',
      newMessage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getChats = async (req, res, next) => {
  try {
    const user1 = req.user._id;
    const user2 = req.body.reciever;
    const chat = await Chat.findOne({
      $or: [
        {
          user1,
          user2,
        },
        {
          user1: user2,
          user2: user1,
        },
      ],
    });
    if (!chat) {
      return res.json({
        status: 'Success',
        chats: [],
      });
    }
    const message = await Message.find({
      chatId: chat._id,
    }).populate([
      {
        path: 'sender',
        select: 'firstName lastName profile',
      },
      {
        path: 'receiver',
        select: 'firstName lastName profile',
      },
    ]);
    res.json({
      chats: message,
      status: 'Success',
    });
  } catch (err) {
    next(err);
  }
};
