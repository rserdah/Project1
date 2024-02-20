const { SimpleServer } = require('./simpleServer');
const { Routes } = require('./routes');

for(var x in Routes) {
    console.log(Routes[x].route);
}
const port = 3000;

const ct = { "Content-Type": "application/json" };

let server = new SimpleServer(onRequest);
server.start(port);

function onRequest(req, body, res) {
    console.log(`${req.method} ${req.url}`);
    let urlNoParams = req.url.indexOf('?') >= 0 ? req.url.substring(0, req.url.indexOf('?')) : req.url;

    Routes[urlNoParams]?.exec(req.method, req, body, res);

    //look at express router files
}