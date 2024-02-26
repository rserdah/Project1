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

router.get('/history', async (req, res) => {
    let resData = {};
    
    if(req.query.author) {
        resData = await ticketService.getTicketsByAuthorId(req.query.author);
        res.status(200).send(resData);
    }
    else {
        res.status(400).send('Must include author id param');
    }
});

router.put('/', async (req, res) => {
    if(!req.body.author)
        res.status(400).json('Missing author author');
    else if(!req.body.amount)
        res.status(400).json('Missing amount');
    else if(!req.body.description)
        res.status(400).json('Missing description');
    else {
        let resData = await ticketService.createTicket(req.body);
        
        res.status(resData.$metadata.httpStatusCode).json(resData);
    }
});

module.exports = router;