const express = require('express');
const router = express.Router();
const { getMessage, sendMessage } = require('../../controllers/messageController');
const verifyJWT = require('../../middleware/verifyJWT');

router.get("/:id", verifyJWT, getMessage);
// need to check if user is authenticated
router.post("/send/:id", verifyJWT, sendMessage);

module.exports = router;