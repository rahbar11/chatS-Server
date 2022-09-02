const bcrypt = require('bcrypt');
const {chatModel} = require('../models/chat');

exports.createRoom = async (room, password, duration) => {
    const chat = await chatModel.findOne({room})
    if (chat.room) {
        if (chat.hash) {
            const match = bcrypt.compare(password, hash)
            if (match) {
                return {
                    status: 200,

                }
            }
        }
    } else {
        
    }
}