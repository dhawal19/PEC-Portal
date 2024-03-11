const express = require('express');
const router = express.Router();
const { getMessage, sendMessage } = require('../../controllers/messageController');
const verifyJWT = require('../../middleware/verifyJWT');

router.get("/", verifyJWT, getMessage);
// need to check if user is authenticated
router.post("/send", verifyJWT, sendMessage);

module.exports = router;