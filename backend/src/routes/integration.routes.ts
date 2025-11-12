import { Router } from 'express';
import { IntegrationController } from '../controllers/integration.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = Router();

// Todas as rotas exigem autenticação e role ADMIN
router.use(authMiddleware);
router.use(roleMiddleware(['ADMIN']));

// Criar integração
router.post('/', IntegrationController.create);

// Listar integrações
router.get('/', IntegrationController.list);

// Buscar integração por ID
router.get('/:id', IntegrationController.getById);

// Atualizar integração
router.patch('/:id', IntegrationController.update);

// Deletar integração
router.delete('/:id', IntegrationController.delete);

// Testar integração
router.post('/:id/test', IntegrationController.test);

// Ativar/Desativar integração
router.patch('/:id/toggle', IntegrationController.toggleActive);

export default router;
