const express = require('express');
const bindRouters = require('./controller/routes/_routers');

const PORT = 3000;


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
bindRouters(app);
app.listen(PORT, () => console.log('Server listening:', `http://localhost:${PORT}`));