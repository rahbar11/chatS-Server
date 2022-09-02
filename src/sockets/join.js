const {auth} = require("../middlewares/auth")

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.use((socketArgs, next) => auth(socketArgs, next, socket))
        socket.on("join room", async ({room}) => {
            try {
                socket.join(room)
                socket.emit("joined", {room})
            } catch(err) {
                console.log(err)
                const error = "Something went wrong!"
                socket.emit("error", {error})
            }
        })
    })
}