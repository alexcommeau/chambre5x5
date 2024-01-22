const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

let waitingRoom = [];

io.on("connection", (socket) => {
  console.log("A user connect");

  socket.emit("updateWaitingRoom", waitingRoom);

  socket.on("disconnect", (username) => {
    console.log("A user " + username + " disconnect");
  });

  socket.on("create-user", (username) => {
    waitingRoom.push({ id: socket.id, username: username });
    io.emit("updateWaitingRoom", waitingRoom);
  });

  socket.on("disconnect", () => {
    waitingRoom = waitingRoom.filter((user) => user.id !== socket.id);
    io.emit("updateWaitingRoom", waitingRoom);
  });
});

httpServer.listen(3005, () => {
  console.log("server running at http://localhost:3005");
});
