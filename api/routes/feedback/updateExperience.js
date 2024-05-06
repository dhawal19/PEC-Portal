const express = require('express');
const router = express.Router();
const { updateExperience } = require('../../controllers/feedbackController');
const verifyJWT = require('../../middleware/verifyJWT');


router.patch('/', verifyJWT, updateExperience);

module.exports = router;