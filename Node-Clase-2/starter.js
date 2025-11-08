const express = require('express');
const bodyParser = require('body-parser');

const desiredPort = process.env.PORT ?? 3000;

const app = express();

//rutas

const shopRoutes = require('./routes/starter-shop');
const admintRoutes = require('./routes/starter-admin');

//middlewares

app.use(bodyParser.urlencoded( {extended: false}))

// app.use((req, res, next) => {
//     console.log('En el middleware');
//     next();
// });

// app.use('/add-product', (req, res) => {
//     res.send('<form action="/product" method="POST"><input type="text" name="product"><button type="submit">Add Product</button></form>')
// })

// app.use('/product', (req, res) => {
//     console.log(req.body);
//     res.redirect('/');
// })

// app.get('/add-product', (req, res) => {
//     res.send('<form action="/product" method="POST"><input type="text" name="product"><button type="submit">Add Product</button></form>')
// })

// app.post('/product', (req, res) => {
//     console.log(req.body);
//     res.redirect('/');
// })

// app.use('/', (req, res) => {
//     console.log('En el middleware de la ruta inicial');
//     res.send('<h1>Saludos cordiales</h1>');
// });

app.use(shopRoutes);
app.use('/admin', admintRoutes);

//Ruta no encontrada

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found :(</h1>')
})

app.listen(desiredPort, () => {
    console.log(`Yo? Escuchando olímpica estereo en el puerto ${desiredPort}`)
});

