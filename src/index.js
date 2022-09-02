const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require("./db/connection")


const port = process.env.PORT

const app = express()
const server = http.createServer(app);
const io = new Server(server);

require('./sockets')(io);


server.listen(port, () => {
    console.log(`listening: ${port}`);
  });