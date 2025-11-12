import { Router } from 'express';
import { FeedbackController } from '../controllers/feedback.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = Router();

// Todas as rotas exigem autenticação
router.use(authMiddleware);

// Criar feedback (usuário autenticado)
router.post('/', FeedbackController.create);

// Buscar feedback por ID
router.get('/:id', FeedbackController.getById);

// Listar feedbacks (Admin/Attendant)
router.get(
  '/',
  roleMiddleware(['ADMIN', 'ATTENDANT']),
  FeedbackController.list
);

// Estatísticas de feedback (Admin/Attendant)
router.get(
  '/stats',
  roleMiddleware(['ADMIN', 'ATTENDANT']),
  FeedbackController.getStats
);

export default router;
