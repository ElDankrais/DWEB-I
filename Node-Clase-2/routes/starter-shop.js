const express = require('express');
const path = require('node:path');
const router = express.Router();
const rootDir = require('../utils/path');

router.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;