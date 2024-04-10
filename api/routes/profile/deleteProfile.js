const express = require('express');
const router = express.Router();
const { deleteProfile } = require('../../controllers/profileController');
const verifyJWT = require('../../middleware/verifyJWT');


router.delete('/', verifyJWT, deleteProfile);

module.exports = router;