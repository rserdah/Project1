const Service = require('./Service');
const ticketDao = require('../repository/dao/TicketDAO');
const logger = require('../util/Logger');


class TicketService extends Service {
// CREATE
    async createTicket(ticket) {
        if(!ticket) {
            logger.error('400 Ticket must not be null/undefined.');
            throw new Error('400 Ticket must not be null/undefined.');
        }

        if(!ticket.amount || ticket.amount <= 0) {
            logger.error('400 Ticket amount cannot be negative or zero.');
            throw new Error('400 Ticket amount cannot be negative or zero.');
        }

        if(!ticket.description) {
            logger.error('400 Ticket must have a description.');
            throw new Error('400 Ticket must have a description.');
        }

        if(!ticket.author) {
            logger.error('400 Ticket must have an author.');
            throw new Error('400 Ticket must have an author.');
        }

        logger.info('Created ticket');
        return await ticketDao.createTicket(ticket);
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
        return await ticketDao.getPendingTickets();
    }

// UPDATE
    async setTicketStatus(ticketId, newStatus) {
        if(!ticketId) {
            logger.error('400 Must have a ticket ID.');
            throw new Error('400 Must have a ticket ID.');
        }

        if(!newStatus) {
            logger.error('400 Must have a status.');
            throw new Error('400 Must have a status.');
        }

        newStatus = newStatus.toLowerCase();
        if(!(newStatus == 'pending' || newStatus == 'approved' || newStatus == 'denied')) {
            logger.error('400 Must have a valid status.');
            throw new Error('400 Must have a valid status.');
        }

        logger.info(`200 Set ticket ${ticketId} status to ${newStatus}`);
        return await ticketDao.setTicketStatus(ticketId, newStatus);
    }

// DELETE

}

module.exports = new TicketService();