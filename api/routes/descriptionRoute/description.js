const express = require('express');
const router = express.Router();
const { createFeedback, addExperience } = require('../../controllers/feedbackController');
const verifyJWT = require('../../middleware/verifyJWT');

// Route to save new feedback
router.post('/', verifyJWT, createFeedback);

// Route to add experience to existing feedback
// router.put('/:id/add-experience', verifyJWT, addExperience);

module.exports = router;
