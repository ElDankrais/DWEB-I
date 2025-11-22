import express from 'express';
import logger from 'morgan';

import { createServer } from 'node:http';
import { Server } from 'socket.io';

const port = process.env.PORT ?? 3000;

//servidor
const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Hola a todos');

    socket.on('disconnect', () => {
        console.log('Meras risas, meros recuerdos... que falla que te hayas ido');
    })

    socket.on('Chanci dijo', (msg) => {
        const username = socket.handshake.auth.username ?? 'anonymous';
        io.emit('Chanci dijo', msg, username);
    })
})

app.use(logger('dev'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/starter.html');
})

server.listen(port, () => {
    console.log('Ya se vino diciembre');
})