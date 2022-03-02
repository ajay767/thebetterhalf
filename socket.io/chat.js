const Message = require("./../models/messageModel");
const cloudinary = require("./../utils/cloudinary");
const streamifier = require("streamifier");
const { createChat } = require("./../helpers/chatHelper");
async function uploadImage(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "betterhalf",
        upload_preset: "ml_default",
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

class Connection {
  constructor({ io, socket, siofu }) {
    this.io = io;
    this.socket = socket;

    socket.join(socket.userId);
    socket.on("message", (...args) => this.handleMessage(...args));
    socket.on("media-sharing-start", (...args) =>
      this.handleMediaStart(...args)
    );
    socket.on("media-sharing-end", (...args) => this.handleMediaEnd(...args));

    socket.on("typing-start", (...args) => this.handleTypingStart(...args));
    socket.on("typing-end", (...args) => this.handleTypingEnd(...args));

    socket.on("disconnect", () => console.log("user disconnected"));

    let uploader = new siofu();
    uploader.listen(socket);
    uploader.on("progress", async (event) => {
      try {
        if (event.file.success) {
          const result = await uploadImage(event.buffer);
          console.log(this.socket.handshake.userId, result.secure_url);
          this.io.to(this.socket.handshake.userId).emit("media", {
            url: result.secure_url,
            format: result.format,
            height: result.height,
            width: result.width,
            type: result.resource_type,
          });
        }
      } catch (error) {
        console.log("cloudinary upload error", error);
      }
    });
  }

  handleMessage(data, socketId) {
    createChat({
      sender: this.socket.handshake.auth.userId,
      reciever: socketId,
      message: data.message,
      media: data?.media,
    });
    this.io.to(socketId).emit("message", data);
  }

  handleMediaStart(socketId) {
    this.io.to(socketId).emit("media-sharing-start", {
      status: true,
    });
  }

  handleMediaEnd(socketId) {
    this.io.to(socketId).emit("media-sharing-end", {
      status: false,
    });
  }

  handleTypingStart(socketId) {
    console.log(socketId, "typing...");
    this.io.to(socketId).emit("typing-start");
  }

  handleTypingEnd(socketId) {
    this.io.to(socketId).emit("typing-end");
  }
}
function initiateChat(io, siofu) {
  console.log("initializing chat connection");

  io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) {
      return next(new Error("Invalid user connection request"));
    }
    socket.userId = userId;
    next();
  });

  io.on("connection", (socket) => {
    console.log("new connection istablished!!", socket.userId);

    new Connection({ io, socket, siofu });
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
