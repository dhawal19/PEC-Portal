const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    SID: {
        type: Number,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    societies: [{
        type: String
    }]
}, { timestamps: true });

const User = new mongoose.model("user", userSchema);
module.exports = User;