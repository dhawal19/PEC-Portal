// const User = require('../models/userModel');
const Attendance = require('../models/attendanceModel');
const User = require('../models/userModel');

const addCourse = async (req, res) => {
    try {
        const { courseName, courseCode, present, total } = req.body;
        const userEmail = req.email;
        console.log(userEmail);
        const user = await User.findOne({ email: userEmail })

        if (!user) return res.status(404).json({ message: "User not found" })

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

const getUserAttendance = async (req, res) => {
    try {
        const userEmail = req.email;
        // console.log(userEmail);
        const user = await User.findOne({ email: userEmail })

        if (!user) return res.status(404).json({ message: "User not found" })

        let courses = await Attendance.find({ user });
        res.status(200).json(courses);
    }
    catch (error) {
        console.log("error in get course controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const editAttendance = async (req, res) => {
    try {
        // console.log(req.body);
        const { present, total } = req.body;
        // console.log(present);
        // console.log(req.query);
        const { courseCode } = req.query;
        const userEmail = req.email;
        // console.log(userEmail);
        const user = await User.findOne({ email: userEmail })
        // console.log(user);
        if (!user) return res.status(404).json({ message: "User not found" })

        const course = await Attendance.findOne({ user: user._id, courseCode: courseCode });

        if (!course) return res.status(404).json({ message: "Course not found" });

        course.percentage.present = present;
        course.percentage.total = total;

        await course.save();
        return res.status(200).json({ message: "Attendance updates successfully!!", course: course });

    }
    catch (error) {
        console.log("error in edit course controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { addCourse, getUserAttendance, editAttendance };