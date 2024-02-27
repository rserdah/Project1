const Service = require('./Service');
const ticketDao = require('../repository/dao/TicketDAO');

class TicketService extends Service {
// CREATE
    async createTicket(ticket) {
        if(!ticket.amount || ticket.amount <= 0) {
            throw new Error('400 Ticket amount cannot be negative or zero.');
        }

        if(!ticket.author) {
            throw new Error('400 Ticket must have an author.');
        }

        return await ticketDao.createTicket(ticket);
    }

// READ
    async getAllTickets() {
        return await ticketDao.getAllTickets();
    }

    async getTicketById(ticketId) {
        return await ticketDao.getTicketById(ticketId);
    }

    async getTicketsByAuthorId(author) {
        if(!author) {
            throw new Error('400 Must have an author ID.');
        }

        return await ticketDao.getTicketsByAuthorId(author);
    }

    async getPendingTickets() {
        return await ticketDao.getPendingTickets();
    }

// UPDATE
    async setTicketStatus(ticketId, newStatus) {
        if(!ticketId) {
            throw new Error('400 Must have a ticket ID.');
        }

        if(!newStatus) {
            throw new Error('400 Must have a status.');
        }

        return await ticketDao.setTicketStatus(ticketId, newStatus);
    }

// DELETE

}

module.exports = new TicketService();