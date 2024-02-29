const ticketService = require('../src/service/TicketService');
const Ticket = require('../src/repository/class/Ticket');

describe("TicketService.createTicket should return HTTP code ", () => {
    const createTicket_NullTicket = async () => {
        await ticketService.createTicket(null);
    };

    const createTicket_NullAmount = async () => {
        await ticketService.createTicket(new Ticket({
            amount: '',
            author: '1',
            description: 'description',
            type: 'type'
        }));
    };

    const createTicket_NegativeAmount = async () => {
        await ticketService.createTicket(new Ticket({
            amount: '-1',
            author: '1',
            description: 'description',
            type: 'type'
        }));
    };

    const createTicket_NullDescription = async () => {
        await ticketService.createTicket(new Ticket({
            amount: '1',
            author: '1',
            description: '',
            type: 'type'
        }));
    };

    const createTicket_NullAuthor = async () => {
        await ticketService.createTicket(new Ticket({
            amount: '1',
            author: '',
            description: 'description',
            type: 'type'
        }));
    };



    
    test('400 when ticket is null/undefined', async () => {
        await expect(createTicket_NullTicket).rejects.toThrow('400');
    });

    test('400 when ticket amount is null/undefined', async () => {
        await expect(createTicket_NullAmount).rejects.toThrow('400');
    });

    test('400 when ticket amount is negative', async () => {
        await expect(createTicket_NegativeAmount).rejects.toThrow('400');
    });

    test('400 when ticket description is null/undefined', async () => {
        await expect(createTicket_NullDescription).rejects.toThrow('400');
    });

    test('400 when ticket author is null/undefined', async () => {
        await expect(createTicket_NullAuthor).rejects.toThrow('400');
    });
});

describe("TicketService.getTicketById should return HTTP code ", () => {
    const getTicketByTicketId_NullId = async () => {
        await ticketService.getTicketById();
    };

    
    test('400 when ticketId is null/undefined', async () => {
        await expect(getTicketByTicketId_NullId).rejects.toThrow('400');
    });
});

describe("TicketService.getTicketsByAuthorId should return HTTP code ", () => {
    const getTicketsByAuthorId_NullId = async () => {
        await ticketService.getTicketsByAuthorId();
    };


    test('400 when author is null/undefined', async () => {
        await expect(getTicketsByAuthorId_NullId).rejects.toThrow('400');
    });
});

describe("TicketService.setTicketStatus should return HTTP code ", () => {
    const setTicketStatus_NullId = async () => {
        await ticketService.setTicketStatus(null, 'approved');
    };

    const setTicketStatus_NullStatus = async () => {
        await ticketService.setTicketStatus('1', null);
    };

    const setTicketStatus_InvalidStatus = async () => {
        await ticketService.setTicketStatus('1', 'nonExistantStatusType');
    };
    


    test('400 when ID is null/undefined', async () => {
        await expect(setTicketStatus_NullId).rejects.toThrow('400');
    });    

    test('400 when status is null/undefined', async () => {
        await expect(setTicketStatus_NullStatus).rejects.toThrow('400');
    });    

    test('400 when status is invalid (is not \'pending\', \'approved\', or \'denied\')', async () => {
        await expect(setTicketStatus_InvalidStatus).rejects.toThrow('400');
    });
});