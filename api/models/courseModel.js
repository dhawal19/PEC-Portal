const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    courseCode: {
        type: String,
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

const Course = new mongoose.model("course", courseSchema);
module.exports = Course;