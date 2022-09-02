const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("./db/connection")


const port = process.env.PORT

const app = express()

app.use(cors())

const server = http.createServer(app);
const io = new Server(server, { 
    cors: {
      origin: 'https://rahbar11.github.io'
    }
});

require('./sockets')(io);


server.listen(port, () => {
    console.log(`listening: ${port}`);
  });