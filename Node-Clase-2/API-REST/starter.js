const express = require('express');

const app = express();

app.disable('x-powered-by');

//Middlewares

app.get('/', (req, res) => res.json({message: 'Aprendamos juntos'}));

app.listen(1234, () => {
    console.log(`server listening on port http://localhost:1234`)
});