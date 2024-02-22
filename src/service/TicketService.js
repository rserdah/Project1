const Service = require('./Service');
const ticketDao = require('../repository/dao/TicketDAO');

class TicketService extends Service {
// CREATE
    createTicket = async (ticket) => await ticketDao.createTicket(ticket);

// READ
    getAllTickets = async () => await ticketDao.getAllTickets();
    getTicketById = async (ticketId) => await ticketDao.getTicketById(ticketId);
    getTicketsByAuthorId = async (author) => await ticketDao.getTicketsByAuthorId(author);

// UPDATE


// DELETE

}

module.exports = new TicketService();