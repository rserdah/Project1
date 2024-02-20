class Route
{
    constructor({ route, onGet, onPut, onPost, onDelete })
    {
        this.route = route;
        this.onGet = onGet;
        this.onPut = onPut;
        this.onPost = onPost;
        this.onDelete = onDelete;
    }

    exec(method, req, body, res)
    {
        switch(method)
        {
            case "GET":
                this.onGet?.(req, body, res);
                break;

            case "PUT":
                this.onPut?.(req, body, res);
                break;

            case "POST":
                this.onPost?.(req, body, res);
                break;

            case "DELETE":
                this.onDelete?.(req, body, res);
                break;
        }
    }
}

module.exports = { Route };