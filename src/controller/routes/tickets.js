const express = require('express');
const path = require('path');
const tryRes = require('../../util/TryResponse');
const { authFinanceManager } = require('../../../src/controller/middleware/auth');

const ticketService = require('../../service/TicketService');

const router = express.Router();

// router.get('/', [func1, func2, func3, ...., funcX], async (req, res) ...... // Can chain middlewares like this

// /ticket
router.get('/', async (req, res) => {
    let resData = {};

// .../ticket?id=xxxx
    if(req.query.id) {
        await tryRes(res, async () => {
            resData = await ticketService.getTicketById(req.query.id);
        });
    }

// .../ticket?author=xxxx
    else if(req.query.author) {
        resData = await ticketService.getTicketsByAuthorId(req.query.author);
    }
    
// .../ticket
    else {
        resData = await ticketService.getAllTickets();
    }

    res.json(resData);
});

router.get('/history', async (req, res) => {
    let resData = {};
    
    await tryRes(res, async () => {
        resData = await ticketService.getTicketsByAuthorId(req.query.author);
        res.status(200).send(resData);
    });
});

router.get('/queue', authFinanceManager, async (req, res) => {
    let resData = await ticketService.getPendingTickets();
    res.send(resData);
});

router.post('/', async (req, res) => {
    await tryRes(res, async () => {
        let resData = await ticketService.createTicket(req.body);
        res.status(resData.$metadata.httpStatusCode).json(resData);
    });
});

router.put('/processing', authFinanceManager, async (req, res) => {
    await tryRes(res, async () => {
        let resData = await ticketService.setTicketStatus(req.query.id, req.body.status);
        res.json(resData);
    });
});

module.exports = router;