const express = require('express');
const router = express.Router();
const { getUsers } = require('../../controllers/connectionController');
const verifyJWT = require('../../middleware/verifyJWT');


router.get('/', verifyJWT, getUsers);

module.exports = router;