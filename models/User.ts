import mongoose from "mongoose";

const users = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    icon: {
        type: String
    }
})

export default mongoose.models['users'] || mongoose.model('users', users);