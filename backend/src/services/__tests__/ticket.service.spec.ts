import { TicketService, createTicketSchema } from '../ticket.service';
import { PrismaClient } from '@prisma/client';

// Mock do Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    ticket: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
    TicketStatus: {
      OPEN: 'OPEN',
      IN_ANALYSIS: 'IN_ANALYSIS',
      IN_PROGRESS: 'IN_PROGRESS',
      COMPLETED: 'COMPLETED',
      CANCELLED: 'CANCELLED',
    },
  };
});

describe('TicketService', () => {
  let ticketService: TicketService;
  let prisma: any;

  beforeEach(() => {
    ticketService = new TicketService();
    prisma = new PrismaClient();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um ticket com sucesso', async () => {
      const ticketData = {
        title: 'Problema com impressora',
        description: 'A impressora do 3º andar não está imprimindo',
        category: 'TI' as const,
        priority: 3,
      };

      const userId = 'user-123';

      const mockTicket = {
        id: 'ticket-123',
        ...ticketData,
        status: 'OPEN',
        createdById: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: {
          id: userId,
          name: 'João Silva',
          email: 'joao@example.com',
        },
        assignedTo: null,
      };

      prisma.ticket.create.mockResolvedValue(mockTicket);

      const result = await ticketService.create(ticketData, userId);

      expect(prisma.ticket.create).toHaveBeenCalledWith({
        data: {
          title: ticketData.title,
          description: ticketData.description,
          category: ticketData.category,
          priority: ticketData.priority,
          createdById: userId,
          status: 'OPEN',
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      expect(result).toEqual(mockTicket);
    });

    it('deve lançar erro se título for muito curto', async () => {
      const ticketData = {
        title: 'Bug',
        description: 'Descrição válida do problema',
        category: 'TI' as const,
        priority: 2,
      };

      await expect(
        ticketService.create(ticketData, 'user-123')
      ).rejects.toThrow();
    });

    it('deve lançar erro se descrição for muito curta', async () => {
      const ticketData = {
        title: 'Título válido',
        description: 'Curta',
        category: 'TI' as const,
        priority: 2,
      };

      await expect(
        ticketService.create(ticketData, 'user-123')
      ).rejects.toThrow();
    });

    it('deve usar prioridade padrão 1 se não fornecida', async () => {
      const ticketData = {
        title: 'Problema com impressora',
        description: 'A impressora do 3º andar não está imprimindo',
        category: 'TI' as const,
      };

      const mockTicket = {
        id: 'ticket-123',
        ...ticketData,
        priority: 1,
        status: 'OPEN',
        createdById: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: {
          id: 'user-123',
          name: 'João Silva',
          email: 'joao@example.com',
        },
      };

      prisma.ticket.create.mockResolvedValue(mockTicket);

      await ticketService.create(ticketData, 'user-123');

      expect(prisma.ticket.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            priority: 1,
          }),
        })
      );
    });
  });

  describe('list', () => {
    it('deve listar tickets com paginação padrão', async () => {
      const mockTickets = [
        {
          id: 'ticket-1',
          title: 'Ticket 1',
          status: 'OPEN',
        },
        {
          id: 'ticket-2',
          title: 'Ticket 2',
          status: 'IN_PROGRESS',
        },
      ];

      prisma.ticket.findMany.mockResolvedValue(mockTickets);
      prisma.ticket.count.mockResolvedValue(2);

      const result = await ticketService.list({}, 'user-123', 'ADMIN');

      expect(prisma.ticket.findMany).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('deve filtrar tickets por status', async () => {
      const mockTickets = [
        {
          id: 'ticket-1',
          title: 'Ticket Aberto',
          status: 'OPEN',
        },
      ];

      prisma.ticket.findMany.mockResolvedValue(mockTickets);
      prisma.ticket.count.mockResolvedValue(1);

      await ticketService.list(
        { status: 'OPEN' },
        'user-123',
        'ADMIN'
      );

      expect(prisma.ticket.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: 'OPEN',
          }),
        })
      );
    });
  });
});
