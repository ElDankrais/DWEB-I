import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { createClient } from "@libsql/client";

dotenv.config();

import { Server } from 'socket.io'
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

const db = createClient({
    url: "libsql://profound-arisia-danielchancir.turso.io",
    authToken: process.env.DB_TOKEN
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    user TEXT
  );
`);

io.on('connection', async (socket) => {
    console.log('Un Forastero!')
  
    socket.on('disconnect', () => {
      console.log('Cogedlo')
    })

    socket.on('Ganado dijo', async (msg) => {
        // io.emit('Ganado dijo', msg)
        let result;
        const username = socket.handshake.auth.username ?? 'anonymous'
        try {
            console.log(msg)
        
            result = await db.execute({
            sql: `INSERT INTO messages (content, user) VALUES (:msg, :username)`,
            args: { msg, username }
            });
        } catch (e) {
            console.error(e)
            return
        }

        io.emit('Ganado dijo', msg, result.lastInsertRowid.toString(), username)
    })

    if (!socket.recovered) {
        try {
          const results = await db.execute({
            sql: `SELECT id, content, user FROM messages WHERE id > ?`,
            args: [socket.handshake.auth.serverOffset ?? 0]
          })

          console.log(results.rows);
    
          results.rows.forEach(row => {
            socket.emit('Ganado dijo', row.content, row.id, row.user)
          })
        } catch (e) {
          console.error(e)
        }
      }
  })

app.use(logger('dev'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
  });

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})