const Friend = require('./../models/friendModel');
const AppError = require('./../utils/AppError');
const { getFriendsHelper } = require('../helpers/friendHelper');
exports.sendRequest = async (req, res, next) => {
  try {
    const user = req.user;
    const { receiver } = req.body;
    if (!receiver) {
      return next(new AppError('Error while sending friend request', 404));
    }
    const existRequest = await Friend.findOne({
      $or: [
        {
          requestedBy: user._id,
          intentedTo: receiver,
        },
        {
          requestedBy: receiver,
          intentedTo: user._id,
        },
      ],
    });
    if (existRequest) {
      console.log(existRequest);
      return next(new AppError('Error while sending friend request', 404));
    }
    // mongo error -> req->user_id and int->coming_id
    const friendRequest = await Friend.create({
      requestedBy: user._id,
      intentedTo: receiver,
    });

    res.status(201).json({
      data: friendRequest,
      status: true,
      message: 'Request Sent',
    });
  } catch (error) {
    next(error);
  }
};

exports.acceptRequest = async (req, res, next) => {
  try {
    const intentedTo = req.user._id;
    const requestedBy = req.params.id;
    const friendRequest = await Friend.findOneAndUpdate(
      {
        requestedBy,
        intentedTo,
      },
      {
        status: 'Accepted',
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!friendRequest) {
      return next(new AppError('No such Friend Request exist', 404));
    }
    res.status(200).json({
      data: friendRequest,
      status: true,
      message: 'Request Accepted',
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteRequest = async (req, res, next) => {
  try {
    const intentedTo = req.user._id;
    const requestedBy = req.params.id;
    await Friend.findOneAndDelete({
      requestedBy,
      intentedTo,
    });
    res.status(200).json({
      status: true,
      message: 'Requested Deleted Successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllFriends = async (req, res, next) => {
  try {
    const user = req.user._id;
    const Friends = await getFriendsHelper(user);
    res.json({
      data: Friends,
      status: true,
      message: "Here's Your all Friends",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllPendingFriends = async (req, res, next) => {
  try {
    const user = req.user._id;
    const allFriends = await Friend.find({
      intentedTo: user,
      status: 'Requested',
    }).populate('requestedBy intentedTo');

    const Friends = allFriends.map((friend) => {
      const { intentedTo, requestedBy } = friend;
      if (requestedBy._id.equals(user._id)) {
        return {
          ...intentedTo._doc,
        };
      }
      return {
        ...requestedBy._doc,
      };
    });
    res.json({
      data: Friends,
      status: true,
      message: "Here's Your all Friends",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllRequests = async (req, res, next) => {
  try {
    const user = req.user;
    const requests = await Friend.find({ receiverId: user._id });
    res.status(200).json({
      data: requests,
      status: true,
      message: 'Success',
    });
  } catch (error) {
    next(error);
  }
};
exports.getRecommendation = async (req, res, next) => {
  try {
    const user = req.user;
    const Friends = await getFriendsHelper(user);
    // console.log(Friends);
    const new_recommended = [];
    const promiseArr = Friends.map(async (friend) => {
      const friends = await getFriendsHelper(friend._id);
      const promiseArr2 = friends.map(async (friend) => {
        if (friend._id == req.user._id) {
          return null;
        }
        const user_friend = await Friend.findOne({
          $or: [
            {
              requestedBy: friend._id,
              intentedTo: req.user._id,
              status: 'Accepted',
            },
            {
              intentedTo: friend._id,
              requestedBy: req.user._id,
              status: 'Accepted',
            },
          ],
        });
        // console.log('----------------------');
        // console.log(user_friend);
        // console.log('----------------------');
        if (!user_friend) {
          new_recommended.push(friend);
        }
      });
      await Promise.all(promiseArr2);
    });
    await Promise.all(promiseArr);
    res.json({
      data: new_recommended,
      status: 'Success',
      message: 'Here is your all Friends',
    });
  } catch (error) {
    next(error);
  }
};
