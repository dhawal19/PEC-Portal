const express = require('express');
const router = express.Router();
const { editAttendance } = require('../../controllers/attendanceController');
const verifyJWT = require('../../middleware/verifyJWT');


router.patch('/data', verifyJWT, editAttendance);

module.exports = router;