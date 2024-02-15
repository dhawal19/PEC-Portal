import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    courseCode: {
        type: Number,
        required: true,
        unique: true,
    },
    credits: {
        type: Number,
        required: true
    },
    experience: [
        {
            type: String,
        }
    ]
}, { timestamps: true });

export const course = mongoose.model("course", courseSchema);