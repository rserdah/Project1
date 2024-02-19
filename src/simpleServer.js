const http = require('http');


class SimpleServer
{
    constructor(onRequest)
    {
        this.onRequest = onRequest;
        this.server = http.createServer(this.onRequestWithChunking.bind(this));
    }

    start(port)
    {
        this.server.listen(port, this.onListen.bind(this));
    }

    onListen() {
        console.log('Server listening:', `http://localhost:${this.server.address().port}`);
    }

    processRequest(req, body, res)
    {
        body = body.length > 0 ? JSON.parse(body) : {};
        this.onRequest(req, body, res);
    }

    onRequestWithChunking(req, res) {
        let body = "";
    
        req
        .on('data', chunk => { body += chunk })
        .on('end', () => this.processRequest(req, body, res));
    }
}

module.exports = { SimpleServer };