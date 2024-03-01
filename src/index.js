const express = require('express');
const bindRouters = require('./controller/routes/_routers');
const logger = require('./util/Logger');
const ticketService = require('./service/TicketService');

const PORT = 3000;


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
bindRouters(app);
app.listen(PORT, () => {
    logger.info('Server listening:', `http://localhost:${PORT}`);
    ticketService.setQueueSize();
});