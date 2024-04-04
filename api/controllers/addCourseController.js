// const User = require('../models/userModel');
const Attendance = require('../models/attendanceModel');
const User = require('../models/userModel');

const addCourse = async (req, res) => {
    try {
        const { courseName, courseCode, present, total } = req.body;
        // console.log(courseName);
        const userEmail = req.email;
        // console.log(userEmail);
        const user = await User.findOne({ email: userEmail });
        const course = await Attendance.findOne({ courseCode });
        // console.log("hi");
        if (course) {
            return res.status(400).json({ message: 'Course already exists' });
        }
        // else create a new course
        const newCourse = new Attendance({
            user,
            courseName,
            courseCode,
            percentage: {
                present,
                total
            }
        })
        await newCourse.save();
        res.status(200).json({ message: 'Course added successfully' });
    }
    catch (error) {
        console.log("error in add course controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = addCourse;