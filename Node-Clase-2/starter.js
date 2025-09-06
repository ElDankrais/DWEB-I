const express = require('express');
const bodyParser = require('body-parser');

const desiredPort = process.env.PORT ?? 3000;

const app = express();

const initialRoutes = require('./routes/starter-shop');
const adminRoutes = require('./routes/starter-admin');

app.use(bodyParser.urlencoded({extended: false}));

// app.get('/', (req, res) => {
//     console.log('En el inicio de los tiempos');
//     res.send('<form action="/creatives" method="POST"><input type="text" name="message"><button type="submit">Crear</button></form>')
// })

// app.post('/creatives', (req, res) => {
//     console.log(req.body);
//     res.redirect('/');
// })

//1. Crear las páginas - 
//2. Lógica de negocio para index
//3. Lógica de negocio para add-product

app.use(initialRoutes);
app.use('/admin', adminRoutes);
app.listen(desiredPort, () => console.log('Escuchando en el puerto: ',desiredPort));