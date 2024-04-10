const express = require('express');
const router = express.Router();
const { addCourse } = require('../../controllers/feedbackController');
const verifyJWT = require('../../middleware/verifyJWT');


router.post('/addCourse', verifyJWT, addCourse);

module.exports = router;