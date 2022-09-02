const {auth} = require("../middlewares/auth")

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.use((socketArgs, next) => auth(socketArgs, next, socket))
        socket.on("msg", async ({msg, room}) => {
            try {
                if(socket.details?.room === room && socket.details?.history){
                    socket.details.messages.push(msg)
                    await socket.details.save()
                }
                io.in(room).emit("msg", {msg})
            } catch(err) {
                console.log(err)
                const error = "Something went wrong!"
                socket.emit("error", {error})
            }
        })
    })
}