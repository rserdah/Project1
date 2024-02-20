const { Route } = require('./route.js');

const RouteObjs = [
    new Route({
        route: '/',
        onGet: (req, body, res) => { res.end("Hi from /"); }
    }),
    
    new Route({
        route: '/hi',
        onGet: (req, body, res) => { res.end("Hi back!"); }
    }),
    
    new Route({
        route: '/hi1',
        onGet: (req, body, res) => { res.end("Hi back!"); }
    })
];


const Routes = {};
RouteObjs.forEach(x => Routes[x.route] = x);

module.exports = { Routes };