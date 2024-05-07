const express = require('express');
const router = express.Router();

const {rejectRequest} = require('../../controllers/connectionController'); 
const verifyJWT = require('../../middleware/verifyJWT');

router.delete('/', verifyJWT, rejectRequest);

module.exports = router;