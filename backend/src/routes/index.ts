import { Router } from 'express';
import authRoutes from './auth.routes';
import ticketRoutes from './ticket.routes';
import dashboardRoutes from './dashboard.routes';
import userRoutes from './user.routes';
import feedbackRoutes from './feedback.routes';
import chatbotRoutes from './chatbot.routes';
import integrationRoutes from './integration.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tickets', ticketRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/users', userRoutes);
router.use('/feedbacks', feedbackRoutes);
router.use('/chatbot', chatbotRoutes);
router.use('/integrations', integrationRoutes);

// Rota de health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default router;
