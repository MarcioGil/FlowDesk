import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';
import {
  authenticateToken,
  requireAdmin,
  createResourceLimiter,
  upload,
} from '../middlewares';

const router = Router();
const ticketController = new TicketController();

// Todas as rotas requerem autenticação
router.use(authenticateToken);

// Rotas de tickets
router.post('/', createResourceLimiter, ticketController.create.bind(ticketController));
router.get('/', ticketController.list.bind(ticketController));
router.get('/:id', ticketController.findById.bind(ticketController));
router.patch('/:id', ticketController.update.bind(ticketController));
router.delete('/:id', requireAdmin, ticketController.delete.bind(ticketController));

// Comentários
router.post('/:id/comments', ticketController.addComment.bind(ticketController));

// Anexos (PDFs)
router.post('/:id/attachments', upload.single('file'), ticketController.addAttachment.bind(ticketController));
router.get('/:id/attachments/:filename', ticketController.downloadAttachment.bind(ticketController));
router.delete('/:id/attachments/:filename', ticketController.deleteAttachment.bind(ticketController));

export default router;
