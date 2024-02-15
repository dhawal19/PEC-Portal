const express = require('express');
const {join} = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router;