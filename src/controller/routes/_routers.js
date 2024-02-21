const routers = 
[
    // Each element is a 2-item arr where 
    // index 0 is the router's base route and 
    // index 1 is the file name of the router
    [
        '/login',
        'login'
    ], 
];

function bindRouters(server)
{
    routers.forEach(x => {
        server.use(x[0], require(`./${x[1]}`));
    });
}

module.exports = bindRouters;