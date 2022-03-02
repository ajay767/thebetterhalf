const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const AppError = require('../utils/AppError');

exports.createChat = async ({ sender, reciever, message, media }) => {
  try {
    const user1 = sender;
    const user2 = reciever;
    // if (user1 == user2) {
    //   return next(new AppError('Both User cannot be same', 400));
    // }
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
      await Chat.findByIdAndUpdate(chatId, {
        latestMessage: message,
      });
    } else {
      const newChat = await Chat.create({
        user1,
        user2,
        latestMessage: message,
      });
      chatId = newChat._id;
    }
    await Message.create({
      chatId,
      sender: user1,
      reciever: user2,
      message,
      media,
    });
  } catch (err) {
    console.log(err);
  }
};
