const User = require('../models/userModel');
const Attendance = require('../models/attendanceModel');

const addCourse = async (req, res) => {
    try {
        const { courseName, courseCode, present, total } = req.body;
        const user = req.user._id;

        let course = await Attendance.findOne({ user, courseCode });
        if (course) {
            return res.status(400).json({ message: 'Course already exists' });
        }
        // else create a new course
        course = new Attendance({
            user,
            courseName,
            courseCode,
            percentage: {
                present,
                total
            }
        })
        await course.save();
        res.status(200).json({ message: 'Course added successfully' });
    }
    catch (error) {
        console.log("error in add course controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { addCourse };