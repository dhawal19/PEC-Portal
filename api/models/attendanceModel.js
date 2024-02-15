import mongoose from "mongoose";

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

export const attendance = mongoose.model("course", attendanceSchema);