const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const chatSocket = require('./socket.io/chat');
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/AppError');
var siofu = require('socketio-file-upload');
const app = express();
const globalErrorHandler = require('./utils/globalErrorHandler');
const {
  authRouter,
  friendRouter,
  s3Router,
  postRouter,
  commentRouter,
} = require('./routes/index');

const server = http.Server(app);

app.use(siofu.router);

const io = socketIo(server, {
  cors: {
    origin: [process.env.CLIENT],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  },
});
chatSocket(io, siofu);

//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// allow other request to get access
var whitelist = [process.env.CLIENT, undefined];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new AppError('Not allowed by CORS', 404));
    }
  },
};
app.use(cors(corsOptions));

/*
  Routes without socket instance
*/

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/friend', friendRouter);
app.use('/api/v1/aws', s3Router);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/comment', commentRouter);

/*
  Routes with socket instance
*/

app.use(function (req, res, next) {
  req.io = io;
  next();
});

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);

module.exports = { app, server };
