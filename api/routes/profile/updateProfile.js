const express = require('express');
const router = express.Router();
const { updateProfile } = require('../../controllers/profileController');
const verifyJWT = require('../../middleware/verifyJWT');


router.patch('/', verifyJWT, updateProfile);

module.exports = router;