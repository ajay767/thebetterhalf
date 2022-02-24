const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema(
  {
    requestedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      index: true,
    },
    intentedTo: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      index: true,
    },
    status: {
      type: String,
      enum: ['Accepted', 'Requested'],
      default: 'Requested',
    },
  },
  { timestamps: true }
);
friendSchema.index({ requestedBy: 1, intentedTo: 1 }, { unique: true });

const Friend = mongoose.model('Friend', friendSchema);
module.exports = Friend;
