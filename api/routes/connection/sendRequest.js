const express = require('express');
const router = express.Router();
const { sendRequest } = require('../../controllers/connectionController');
const verifyJWT = require('../../middleware/verifyJWT');


router.post('/', verifyJWT, sendRequest);

module.exports = router;