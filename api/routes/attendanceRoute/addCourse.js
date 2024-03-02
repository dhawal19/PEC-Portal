const express = require('express');
const router = express.Router();
const handleAdd = require('../../controllers/addCourseController.js');
const protectRoute = require('../../middleware/protectRoute');


router.post('/attendance', protectRoute, handleAdd);

module.exports = router;