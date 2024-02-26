const Service = require('./Service');
const ticketDao = require('../repository/dao/TicketDAO');

class TicketService extends Service {
// CREATE
    async createTicket(ticket) {
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
        return await ticketDao.getTicketsByAuthorId(author);
    }

// UPDATE


// DELETE

}

module.exports = new TicketService();