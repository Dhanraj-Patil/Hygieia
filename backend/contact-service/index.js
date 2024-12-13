require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT;
// const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const clientConsultantNamespace = io.of("/client-consultant");
clientConsultantNamespace.on("connection", (socket) => {
  console.log("Client or Consultant connected:", socket.id);

  socket.on("message", (data) => {
    clientConsultantNamespace.emit("message", data);
  });
});

server.listen(PORT, () => {
  console.log("Server is running on port 3003");
});
