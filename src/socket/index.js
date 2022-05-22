module.exports = (io) => {
  io.on("connection", (socket) => {
    // khi người dùng vào chi tiết sản phẩm
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
    });
    // khi người dùng comment sản phẩm
    socket.on("send-message", (message) => {
      socket.to(message.roomId).emit("receive-message", message);
    });
  });
};
