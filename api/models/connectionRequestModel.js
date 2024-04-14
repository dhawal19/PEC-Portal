const mongoose = require('mongoose');
const connectionSchema = new mongoose.Schema({
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receivedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const connectionRequest = new mongoose.model("connectionRequest", connectionSchema);
module.exports = connectionRequest;