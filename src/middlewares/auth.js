const bcrypt = require('bcrypt');
const {chatModel} = require('../models/chat');


exports.auth = async (socketArgs, next, socket) => {
    try {
        if (socketArgs[0] !== "create room") {
            const {room, password} = socketArgs[1]
            const chat = await chatModel.findOne({room})
            if (chat) {
                const match = await bcrypt.compare(password, chat.hash)
                if (match) {
                    socket.details = chat
                    next()
                } else {
                    const error = "Something went wrong!"
                    socket.emit("error", {error})
                }
            } else {
                next()
            }
        } else if (socketArgs[0] === "create room") {
            next()
        }
    } catch (error) {
        console.log("auth---->", error)
    }
}