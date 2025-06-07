const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    console.log(url, method);
    if (url === '/creatives' && method === 'GET') {
        res.write('<html>');
        res.write('<head><title>OE</title></head>');
        res.write('Esta es tu página del trabajo');
        res.write('</html>');
        return res.end();
    }
    if (url === '/creatives' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            console.log(body)
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[1];
            fs.writeFile('hello.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>OE</title></head>');
    res.write('<body>');
    res.write('<form action="/creatives" method="GET"><button type="submit">Ir a</button></form>')
    res.write('<form action="/creatives" method="POST"><input type="text" name="message"><button type="submit">Crear</button></form>')
    res.write('</body>')
    res.write('</html>');
    res.end();
}

module.exports = {
    handler: requestHandler,
    someText: 'Hola a todos'
}