const Message = require("./../models/messageModel");

class Connection {
  constructor({ io, socket }) {
    this.io = io;
    this.socket = socket;
    socket.join(socket.userId);
    socket.on("message", (...args) => this.handleMessage(...args));
    socket.on("disconnect", () => console.log("user disconnected"));
  }

  handleMessage(message, socketId) {
    console.log(message, socketId, this.socket.userId);
    this.io.to(socketId).emit("message", message);
  }
}

function initiateChat(io) {
  console.log("initializing chat connection");

  io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    console.log("middle", userId);
    if (!userId) {
      return next(new Error("Invalid user connection request"));
    }
    socket.userId = userId;
    next();
  });

  io.on("connection", (socket) => {
    console.log("new connection istablished!!", socket.userId);
    new Connection({ io, socket });
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        socketId: id,
        userId: socket.userId,
      });
    }
    socket.emit("users", users);
  });
}

module.exports = initiateChat;
