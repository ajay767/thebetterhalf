const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Notification cannot be created without description"],
    },
    href: String,
    photo: String,
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
