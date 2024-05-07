const express = require('express');
const router = express.Router();
const { getFriends } = require('../../controllers/connectionController');
const verifyJWT = require('../../middleware/verifyJWT');


router.get('/', verifyJWT, getFriends);

module.exports = router;