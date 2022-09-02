const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    room: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    messages: {
        type: [String],
        default: []
    },
    history: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date,
        default: null,
    }
})

chatSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

exports.chatModel = mongoose.model("chat", chatSchema)