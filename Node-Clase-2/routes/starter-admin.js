//Añadir productos
//traer vista de añadir productos
const express = require('express');
const path = require('node:path');
const router = express.Router();
const rootDir = require('../utils/path');
const fs = require('node:fs/promises');

router.get('/add-product', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res) => {
    const value = req.body.title;
    fs.writeFile('cyndaquil.txt', value)
        .then(res.redirect('/'));
})

module.exports = router;