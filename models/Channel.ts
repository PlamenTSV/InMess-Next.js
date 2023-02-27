import mongoose from "mongoose";

const channels = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String
    }
})

export default mongoose.models['channels'] || mongoose.model('channels', channels);