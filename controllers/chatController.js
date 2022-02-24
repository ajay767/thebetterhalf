const Chat = require("./../models/chatModel");
const AppError = require("../utils/AppError");

exports.addParticipant = async (req, res, next) => {
  try {
    const { userId, chatId, token } = req.body;
  } catch (error) {
    next(error);
  }
};
