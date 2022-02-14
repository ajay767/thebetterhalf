const Friend = require("./../models/friendModel");

exports.sendRequest = async (req, res, next) => {
  try {
    const io = req.io;
    const user = req.user;
    const { receiver } = req.body;
    if (!receiver) {
      return next("Error while sending friend request", 404);
    }

    const friendRequest = await Friend.create({
      senderId: user._id,
      receiverId: receiver,
    });

    res.status(200).json({
      data: friendRequest,
      status: true,
      message: "Request Sent",
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllRequests = async (req, res, next) => {
  try {
    const user = req.user;
    const requests = await Friend.find({ receiverId: user._id });
    res.status(200).json({
      data: requests,
      status: true,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
