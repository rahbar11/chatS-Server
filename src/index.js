const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require("./db/connection")

const app = express()
const server = http.createServer(app);
const io = new Server(server, { 
    cors: {
      origin: 'http://localhost:3000'
    }
});

require('./sockets')(io);


server.listen(3001, () => {
    console.log('listening on *:3001');
  });