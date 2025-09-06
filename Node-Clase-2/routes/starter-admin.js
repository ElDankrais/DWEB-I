//Añadir productos
//Traer los productos
const path = require('path');
const rootDir = require('../utils/path');

const express = require('express');
const router = express.Router();

router.get('/add-product', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
})


router.post('/add-product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
})
module.exports = router;