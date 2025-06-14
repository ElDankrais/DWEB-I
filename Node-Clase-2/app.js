const http = require('http');

const desiredPort = process.env.PORT ?? 3000 

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
// app.use((req, res, next) => {
//     console.log('En el middleware');
//     next();
// })

// app.use('/', (req, res, next) => {
//     console.log('En el middleware inicial');
//     next();
// })

// app.use('/add-product', (req, res) => {
//     console.log('En el middleware de productos');
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
// })

// app.use('/product', (req, res) => {
//     console.log(req.body)
//     res.redirect('/');
// })

// app.use('/', (req, res) => {
//     console.log('En el middleware izy');
//     res.send('<h1>Holi</h1>');
// })

// const server = http.createServer(app);

// server.listen(desiredPort, () =>  console.log(`server listening on port http://localhost:${desiredPort}`));

app.use('/admin', adminRoutes);

app.use(shopRoutes); 

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>')
})

app.listen(desiredPort);