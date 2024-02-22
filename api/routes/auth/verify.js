const express = require('express');
const verifyJWT = require('../../middleware/verifyJWT');
const router = express.Router();

router.get('/', verifyJWT, (req,res) => {
    if(!req.email || req.email === undefined)
        return res.status(403).json({error: "Invalid token"});
    res.status(200).json({message: "Valid token"});
});

module.exports = router;