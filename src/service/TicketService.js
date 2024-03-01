const Service = require('./Service');
const ticketDao = require('../repository/dao/TicketDAO');
const logger = require('../util/Logger');


class TicketService extends Service {
    static TicketQueue = [];

    async setTicketQueue() {
        if(!TicketService.QUEUE_SIZE_SET) {
            let tickets = await ticketDao.getPendingTickets();

            TicketService.TicketQueue = tickets.toSorted((a, b) => a.submissionTime - b.submissionTime);

            logger.info('Set ticket queue');
        }
    }

// CREATE
    async createTicket(ticket) {
        if(!ticket) {
            logger.error('400 Ticket must not be null/undefined.');
            throw new Error('400 Ticket must not be null/undefined.');
        }

        if(!Number(ticket.amount) || (ticket.amount <= 0)) {
            logger.error('400 Ticket amount cannot be negative, zero, or NaN.');
            throw new Error('400 Ticket amount cannot be negative, zero, or NaN.');
        }

        if(!ticket.description) {
            logger.error('400 Ticket must have a description.');
            throw new Error('400 Ticket must have a description.');
        }

        if(!ticket.author) {
            logger.error('400 Ticket must have an author.');
            throw new Error('400 Ticket must have an author.');
        }

        logger.info(`Created ticket`);

        let newTicket = await ticketDao.createTicket(ticket);
        
        await this.setTicketQueue();

        return newTicket;
    }

// READ
    async getAllTickets() {
        logger.info(`Retrieved all tickets`);
        return await ticketDao.getAllTickets();
    }

    async getTicketById(ticketId) {
        if(!ticketId) {
            logger.error('400 Must have a ticket ID.');
            throw new Error('400 Must have a ticket ID');
        }

        logger.info(`Retrieved tickets by ticket ID ${ticketId}`);
        return await ticketDao.getTicketById(ticketId);
    }

    async getTicketsByAuthorId(author) {
        if(!author) {
            logger.error('400 Must have an author ID.');
            throw new Error('400 Must have an author ID.');
        }

        logger.info(`Retrieved tickets by author ID ${author}`);
        return await ticketDao.getTicketsByAuthorId(author);
    }

    async getPendingTickets() {
        logger.info(`Retrieved pending tickets`);
        return TicketService.TicketQueue;
    }

// UPDATE
    async setTicketStatus(ticketId, newStatus, resolverEmployeeId = -1) {
        if(!ticketId) {
            logger.error('400 Must have a ticket ID.');
            throw new Error('400 Must have a ticket ID.');
        }

        if(!newStatus) {
            logger.error('400 Must have a status.');
            throw new Error('400 Must have a status.');
        }

        newStatus = newStatus.toLowerCase();

        if(newStatus == 'pending') {
            logger.error('400 Ticket status cannot be changed to pending.');
            throw new Error('400 Ticket status cannot be changed to pending.');
        }

        if(!(newStatus == 'approved' || newStatus == 'denied')) {
            logger.error('400 Must have a valid status.');
            throw new Error('400 Must have a valid status.');
        }

        let ticketArr = await this.getTicketById(ticketId);

        if(!ticketArr || ticketArr.length == 0) {
            logger.error('404 Ticket not found.');
            throw new Error('404 Ticket not found.');
        }

        let ticket = ticketArr[0];

        console.log(JSON.stringify(ticket));

        if(ticket.status != 'pending') {
            logger.error('400 Processed tickets cannot be changed.');
            throw new Error('400 Processed tickets cannot be changed.');
        }

        logger.info(`200 Set ticket ${ticketId} status to ${newStatus}`);
        let result = await ticketDao.setTicketStatus(ticketId, newStatus, resolverEmployeeId);

        await this.setTicketQueue();

        return result;
    }
}

module.exports = new TicketService();