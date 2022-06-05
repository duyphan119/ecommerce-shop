const connection = (socket) => {
  // khi người dùng vào chi tiết sản phẩm
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });
  // khi người dùng comment sản phẩm
  socket.on("send-message", (message) => {
    socket.to(message.roomId).emit("receive-message", message);
  });
  // Khi làm gì sẽ gửi thông báo
  socket.on("send-notify", (notify) => {
    socket.to(notify.roomId).emit("receive-notify", notify);
  });
};

module.exports = { connection };
