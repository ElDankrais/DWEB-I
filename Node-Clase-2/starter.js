const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const shopRoutes = require('./routes/starter-shop');
const adminRoutes = require('./routes/starter-admin');

app.use(bodyParser.urlencoded({extended: false}));

const desiredPort = process.env.PORT ?? 3000;

// app.use((req, res, next) => {
//     console.log('Middleware 1');
//     next();
// });

// app.use('/', (req, res, next) => {
//     console.log('En el middleware inicial de la app');
//     next();
// })

// app.use('/add-product', (req, res) => {
//     console.log('En el middleware de productos');
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
// })

// app.use('/product', (req, res) => {
//     console.log(req.body)
//     res.redirect('/');
// }

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(desiredPort, () => {
    console.log(`Example app listening on port ${desiredPort}`)
})