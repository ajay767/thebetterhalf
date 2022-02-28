const Friend = require('./../models/friendModel');
const AppError = require('./../utils/AppError');

exports.getFriendsHelper = async (user) => {
  const allFriends = await Friend.find({
    $or: [
      {
        requestedBy: user,
        status: 'Accepted',
      },
      {
        intentedTo: user,
        status: 'Accepted',
      },
    ],
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
  return Friends;
};
