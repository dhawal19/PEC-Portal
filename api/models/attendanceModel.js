const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    percentage: {
        present: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        }
    }
}, { timestamps: true });

const Attendance = new mongoose.model("attendance", attendanceSchema);
module.exports = Attendance;