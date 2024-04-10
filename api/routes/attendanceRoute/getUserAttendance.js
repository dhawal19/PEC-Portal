const express = require('express');
const router = express.Router();
const { getUserAttendance } = require('../../controllers/attendanceController');
const verifyJWT = require('../../middleware/verifyJWT');


router.get('/', verifyJWT, getUserAttendance);

module.exports = router;