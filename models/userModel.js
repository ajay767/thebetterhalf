const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Please Provide a valid user name"],
  },
  isPrivate: { type: Boolean, default: false },
  profile: String,
  tags: [String],
  email: {
    type: String,
    unique: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    required: [true, "Please Provide an Email"],
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  typed_password,
  user_password
) {
  return await bcryptjs.compare(typed_password, user_password);
};

// userSchema.methods.createPasswordResetToken = function() {
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     this.passwordResetToken = crypto
//      .createHash("sha256")
//      .update(resetToken)
//      .digest("hex");

//      this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//      return resetToken;
// }

const User = mongoose.model("User", userSchema);
module.exports = User;
