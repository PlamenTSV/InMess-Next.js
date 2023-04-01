import mongoose from "mongoose";

const messages = new mongoose.Schema({
    senderID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    channelID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    sentAt: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

export default mongoose.models['messages'] || mongoose.model('messages', messages);