const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");
const morgan = require("morgan");
const AppError = require("./utils/AppError");
const app = express();
const globalErrorHandler = require("./utils/globalErrorHandler");
const { authRouter, friendRouter } = require("./routes");

const server = http.Server(app);

const io = socketIo(server, {
  cors: {
    origin: [process.env.CLIENT],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  },
});

//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// allow other request to get access
app.use(cors());

/*
  Routes with socket instance
*/

app.use(function (req, res, next) {
  req.io = io;
  next();
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/friend", friendRouter);

/*
  Routes without socket instance
*/

//-----------------

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
