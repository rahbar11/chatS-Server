const bcrypt = require('bcrypt');
const {chatModel} = require('../models/chat');


const durations = {
    "1h": 1000*60*60,
    "1d": 1000*60*60*24,
    "7d": 1000*60*60*24*7,
    "1m": 1000*60*60*24*30,
}

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("create room", async ({room, password, duration, messageHistory}) => {
            try {
                const chat = await chatModel.findOne({room})
                if (chat) {
                    const error = "Something went wrong!"
                    socket.emit("error", {error})
                } else {
                    if (duration !== "0") {
                        io.in(room).emit("left")
                        io.socketsLeave(room)
                        const hash = await bcrypt.hash(password, 10)
                        const expiresAt = new Date(Date.now() + durations[duration])
                        await chatModel.create({room, hash, history: messageHistory, expiresAt})
                    }
                    socket.join(room)
                    socket.emit("joined", {room})
                }
            } catch(err) {
                console.log(err)
                const error = "Something went wrong!"
                socket.emit("error", {error})
            }
        })
    })
}