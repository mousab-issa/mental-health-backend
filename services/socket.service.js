const socketIo = require("socket.io");
const Msg = require("../models/messageModel");

module.exports = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    socket.on("sendMessage", (data) => {
      const newMessage = new Msg(data);
      newMessage.save().then((message) => {
        io.to(data.chat_id).emit("message", message);
      });
    });

    socket.on("joinChat", (chat_id) => {
      socket.join(chat_id);
    });
  });
};
