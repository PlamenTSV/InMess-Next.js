import mongoose from "mongoose";

const channels = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    members: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true
    }
})

export default mongoose.models['channels'] || mongoose.model('channels', channels);