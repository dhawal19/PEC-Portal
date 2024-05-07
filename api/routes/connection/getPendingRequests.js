const express = require('express');
const router = express.Router();
const { getPendingRequests } = require('../../controllers/connectionController');
const verifyJWT = require('../../middleware/verifyJWT');


router.get('/', verifyJWT, getPendingRequests);

module.exports = router;