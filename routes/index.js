const authRouter = require("./authRoutes.js");
const friendRouter = require("./friendRoute");
const s3Router = require("./s3Routes");

module.exports = {
  authRouter,
  friendRouter,
  s3Router,
};
