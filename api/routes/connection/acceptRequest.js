const express = require('express');
const router = express.Router();
const { acceptRequest } = require('../../controllers/connectionController');
const verifyJWT = require('../../middleware/verifyJWT');


router.patch('/', verifyJWT, acceptRequest);

module.exports = router;