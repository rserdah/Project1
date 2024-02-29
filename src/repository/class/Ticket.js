const uuid = require('uuid');

class Ticket
{
    constructor({ amount, author, description })
    {
        this.ticketId = uuid.v4();
        this.submissionTime = Math.floor(Date.now() / 1000);
        this.submissionTimeFormatted = new Date(this.submissionTime, "MM/DD/YYYY").toString();
        this.amount = amount;
        this.author = author;
        this.description = description;
        this.status = 'pending';
    }
}

module.exports = Ticket;