import { PrismaClient, TicketStatus } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Schemas de validação
export const createTicketSchema = z.object({
  title: z.string().min(5, 'Título deve ter no mínimo 5 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  category: z.enum(['TI', 'RH', 'FINANCEIRO', 'COMPRAS', 'INFRAESTRUTURA']),
  priority: z.number().int().min(1).max(4).default(1),
});

export const updateTicketSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().min(10).optional(),
  category: z.enum(['TI', 'RH', 'FINANCEIRO', 'COMPRAS', 'INFRAESTRUTURA']).optional(),
  priority: z.number().int().min(1).max(4).optional(),
  status: z.enum(['OPEN', 'IN_ANALYSIS', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  assignedToId: z.string().uuid().nullable().optional(),
});

export const listTicketsSchema = z.object({
  status: z.enum(['OPEN', 'IN_ANALYSIS', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  category: z.enum(['TI', 'RH', 'FINANCEIRO', 'COMPRAS', 'INFRAESTRUTURA']).optional(),
  assignedToMe: z.boolean().optional(),
  createdByMe: z.boolean().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export class TicketService {
  /**
   * Cria um novo ticket
   */
  async create(data: z.infer<typeof createTicketSchema>, userId: string) {
    const validated = createTicketSchema.parse(data);

    const ticket = await prisma.ticket.create({
      data: {
        title: validated.title,
        description: validated.description,
        category: validated.category,
        priority: validated.priority,
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

    return ticket;
  }

  /**
   * Lista tickets com filtros e paginação
   */
  async list(
    filters: z.infer<typeof listTicketsSchema>,
    userId: string,
    userRole: string
  ) {
    const validated = listTicketsSchema.parse(filters);
    const skip = (validated.page - 1) * validated.limit;

    const where: any = {};

    // Filtros básicos
    if (validated.status) where.status = validated.status;
    if (validated.category) where.category = validated.category;

    // Filtros de atribuição
    if (validated.assignedToMe) where.assignedToId = userId;
    if (validated.createdByMe) where.createdById = userId;

    // Usuários comuns só veem seus próprios tickets
    if (userRole === 'USER' && !validated.createdByMe) {
      where.createdById = userId;
    }

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        skip,
        take: validated.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          createdBy: {
            select: { id: true, name: true, email: true },
          },
          assignedTo: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: { comments: true },
          },
        },
      }),
      prisma.ticket.count({ where }),
    ]);

    return {
      tickets,
      pagination: {
        page: validated.page,
        limit: validated.limit,
        total,
        totalPages: Math.ceil(total / validated.limit),
      },
    };
  }

  /**
   * Busca um ticket por ID
   */
  async findById(ticketId: string, userId: string, userRole: string) {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true, role: true },
        },
        assignedTo: {
          select: { id: true, name: true, email: true, role: true },
        },
        comments: {
          orderBy: { createdAt: 'asc' },
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
        history: {
          orderBy: { changedAt: 'desc' },
          include: {
            changedBy: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!ticket) {
      throw new Error('TICKET_NOT_FOUND');
    }

    // Usuários comuns só podem ver seus próprios tickets
    if (userRole === 'USER' && ticket.createdById !== userId) {
      throw new Error('UNAUTHORIZED_ACCESS');
    }

    return ticket;
  }

  /**
   * Atualiza um ticket
   */
  async update(
    ticketId: string,
    data: z.infer<typeof updateTicketSchema>,
    userId: string,
    userRole: string
  ) {
    const validated = updateTicketSchema.parse(data);

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new Error('TICKET_NOT_FOUND');
    }

    // Usuários comuns só podem editar seus próprios tickets
    if (userRole === 'USER' && ticket.createdById !== userId) {
      throw new Error('UNAUTHORIZED_ACCESS');
    }

    // Se o status mudou, cria um registro no histórico
    if (validated.status && validated.status !== ticket.status) {
      await prisma.ticketHistory.create({
        data: {
          ticketId,
          oldStatus: ticket.status,
          newStatus: validated.status as TicketStatus,
          changedById: userId,
        },
      });
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: validated,
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return updatedTicket;
  }

  /**
   * Deleta um ticket (apenas Admin)
   */
  async delete(ticketId: string) {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new Error('TICKET_NOT_FOUND');
    }

    await prisma.ticket.delete({
      where: { id: ticketId },
    });

    return { message: 'Ticket deletado com sucesso' };
  }

  /**
   * Adiciona um comentário ao ticket
   */
  async addComment(ticketId: string, message: string, userId: string, userRole: string) {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new Error('TICKET_NOT_FOUND');
    }

    // Usuários comuns só podem comentar em seus próprios tickets
    if (userRole === 'USER' && ticket.createdById !== userId) {
      throw new Error('UNAUTHORIZED_ACCESS');
    }

    const comment = await prisma.comment.create({
      data: {
        message,
        ticketId,
        userId,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return comment;
  }
  
  /**
   * Adiciona um anexo ao ticket
   */
  async addAttachment(
    ticketId: string,
    filename: string,
    originalname: string,
    userId: string,
    userRole: string
  ) {
    // Verificar se ticket existe
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) {
      throw new Error('Ticket não encontrado');
    }

    // Verificar permissão: criador, atribuído ou admin/atendente
    if (
      ticket.createdById !== userId &&
      ticket.assignedToId !== userId &&
      userRole !== 'ADMIN' &&
      userRole !== 'ATTENDANT'
    ) {
      throw new Error('Você não tem permissão para adicionar anexos a este ticket');
    }

    // Atualizar ticket com novo anexo
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        attachments: {
          push: filename,
        },
      },
    });

    return {
      filename,
      originalname,
      url: `/uploads/${filename}`,
    };
  }

  /**
   * Obtém caminho do anexo para download
   */
  async getAttachmentPath(ticketId: string, filename: string, userId: string, userRole: string) {
    // Verificar se ticket existe
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) {
      throw new Error('Ticket não encontrado');
    }

    // Verificar permissão: criador, atribuído ou admin/atendente
    if (
      ticket.createdById !== userId &&
      ticket.assignedToId !== userId &&
      userRole !== 'ADMIN' &&
      userRole !== 'ATTENDANT'
    ) {
      throw new Error('Você não tem permissão para acessar anexos deste ticket');
    }

    // Verificar se anexo existe
    if (!ticket.attachments.includes(filename)) {
      throw new Error('Anexo não encontrado');
    }

    // Verificar se arquivo existe fisicamente
    const path = require('path');
    const fs = require('fs');
    const filePath = path.join(__dirname, '../../uploads', filename);

    if (!fs.existsSync(filePath)) {
      throw new Error('Arquivo não encontrado no servidor');
    }

    return filePath;
  }

  /**
   * Remove um anexo do ticket
   */
  async deleteAttachment(ticketId: string, filename: string, userId: string, userRole: string) {
    // Verificar se ticket existe
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) {
      throw new Error('Ticket não encontrado');
    }

    // Verificar permissão: criador ou admin/atendente
    if (ticket.createdById !== userId && userRole !== 'ADMIN' && userRole !== 'ATTENDANT') {
      throw new Error('Você não tem permissão para remover anexos deste ticket');
    }

    // Verificar se anexo existe
    if (!ticket.attachments.includes(filename)) {
      throw new Error('Anexo não encontrado');
    }

    // Remover anexo do array
    const updatedAttachments = ticket.attachments.filter((att) => att !== filename);

    // Atualizar ticket
    await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        attachments: updatedAttachments,
      },
    });

    // Deletar arquivo físico
    const { deleteFile } = require('../middlewares/upload');
    deleteFile(filename);
  }
}
