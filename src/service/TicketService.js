const Service = require('./Service');
const ticketDao = require('../repository/dao/TicketDAO');
const logger = require('../util/Logger');


class TicketService extends Service {
    static QUEUE_SIZE = 0;
    static QUEUE_SIZE_SET = false;

    /** Set queue size on server start so newly added tickets can be placed in the right spot in queue */
    async setQueueSize() {
        if(!TicketService.QUEUE_SIZE_SET) {
            let tickets = await this.getAllTickets();

            TicketService.QUEUE_SIZE = tickets.reduce((max, x) => {
                let idx = Number(x.queueIndex);

                if(idx || idx === 0) {
                    if(idx > max) {
                        max = idx > max ? idx : max;
                    }
                }

                return max;
            }, 0);

            logger.info(`Set ticket queue size to ${TicketService.QUEUE_SIZE}`);

            TicketService.QUEUE_SIZE_SET = true;
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

        let ticket2 = JSON.parse(JSON.stringify(ticket));

        // When adding ticket, make its index the next index in the queue and increase the queue size by one
        ticket2['queueIndex'] = String(this.QUEUE_SIZE);
        this.QUEUE_SIZE += 1;

        logger.info(`Created ticket ${ticket2.queueIndex}`);
        return await ticketDao.createTicket(ticket2);
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
        let tickets = await ticketDao.getPendingTickets();

        // Sort the tickets based on their queue index because they should be given priority based on their place in queue
        tickets = tickets.toSorted((a, b) => a.queueIndex - b.queueIndex);

        return tickets;
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
        return await ticketDao.setTicketStatus(ticketId, newStatus);
    }

// DELETE

}

module.exports = new TicketService();