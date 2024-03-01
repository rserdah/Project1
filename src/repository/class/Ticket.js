const uuid = require('uuid');

class Ticket
{
    constructor({ amount, author, description })
    {
        this.ticketId = uuid.v4();
        this.submissionTime = Math.floor(Date.now() / 1000);
        this.submissionTimeFormatted = new Date().toString();
        this.amount = amount;
        this.author = author;
        this.resolver = 0;
        this.description = description;
        this.status = 'pending';
    }
}

module.exports = Ticket;