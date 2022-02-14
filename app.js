const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");
const morgan = require("morgan");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./utils/globalErrorHandler");
const authRoutes = require("./routes/authRoutes");
const app = express();

const server = http.Server(app);

const io = socketIo(server, {
  cors: {
    origin: [process.env.CLIENT],
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["my-custom-header"],
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
app.use("/api/v1/auth", authRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
