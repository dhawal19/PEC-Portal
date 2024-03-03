const express = require('express');
const router = express.Router();
const handleAdd = require('../../controllers/addCourseController');
const verifyJWT = require('../../middleware/verifyJWT');


router.post('/', verifyJWT, handleAdd);

module.exports = router;