const express = require('express');
const path = require('path');

const ticketService = require('../../service/TicketService');

const router = express.Router();

// router.get('/', [func1, func2, func3, ...., funcX], async (req, res) ...... // Can chain middlewares like this

// /ticket
router.get('/', async (req, res) => {
    let resData = {};

    // .../ticket?id=xxxx
    if(req.query.id)
        resData = await ticketService.getTicketById(req.query.id);

    // .../ticket?author=xxxx
    else if(req.query.author)
        resData = await ticketService.getTicketsByAuthorId(req.query.author);

    // .../ticket
    else
        resData = await ticketService.getAllTickets();

    res.json(resData);
});

router.put('/', async (req, res) => {
    let resData = await ticketService.createTicket(req.body);
    
    res.status(resData.$metadata.httpStatusCode).json(resData);
});

module.exports = router;