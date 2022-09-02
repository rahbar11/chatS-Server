const {auth} = require("../middlewares/auth")

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.use((socketArgs, next) => auth(socketArgs, next, socket))
        socket.on("history", async ({room}) => {
            try {
                if(socket.details?.room === room){
                   io.in(room).emit("history", {msgs: socket.details.messages})
                }
            } catch(err) {
                console.log(err)
                const error = "Something went wrong!"
                socket.emit("error", {error})
            }
        })
    })
}