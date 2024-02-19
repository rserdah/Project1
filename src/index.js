const { SimpleServer } = require('./simpleServer');

const port = 3000;

const ct = { "Content-Type": "application/json" };

let server = new SimpleServer(onRequest);
server.start(port);

function onRequest(req, body, res) {
    console.log(`${req.method} ${req.url}`);
    let urlNoParams = req.url.indexOf('?') >= 0 ? req.url.substring(0, req.url.indexOf('?')) : req.url;

    // switch(req.method)
    // {
    //     case "GET":

    //         break;
    // }
}