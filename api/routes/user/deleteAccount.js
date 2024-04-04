const verifyJWT = require('../../middleware/verifyJWT');
const express = require('express');
const router = express.Router();

const { deleteAccount } = require('../../controllers/userController');

router.delete('/', verifyJWT, deleteAccount);

module.exports = router;