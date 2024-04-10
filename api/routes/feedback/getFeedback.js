const express = require('express');
const router = express.Router();
const { getFeedback } = require('../../controllers/feedbackController');
const verifyJWT = require('../../middleware/verifyJWT');


router.get('/getFeedback', verifyJWT, getFeedback);

module.exports = router;