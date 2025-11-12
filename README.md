# HelpDeskFlow

Sistema de Help Desk com recursos de IA integrados.

## Sobre o Projeto

Sistema completo para gerenciamento de chamados internos com 4 funcionalidades baseadas em Inteligencia Artificial:

- **Chatbot Inteligente** - Respostas automaticas com base de conhecimento
- **Priorizacao Automatica** - Classificacao de urgencia por IA  
- **Sistema NPS** - Pesquisas de satisfacao com analise de sentimento
- **Integracoes Empresariais** - Slack, Microsoft Teams e WhatsApp Business

## Funcionalidades

### Sistema Base
- Autenticacao JWT com controle de permissoes por funcao
- Gestao completa de chamados com CRUD
- Dashboard com metricas em tempo real
- Sistema de comentarios entre atendentes e usuarios
- Exportacao de relatorios em PDF
- Gerenciamento de usuarios e permissoes

### Recursos de IA
- Chatbot com respostas contextuais
- Priorizacao automatica de tickets por urgencia
- Analise de sentimento em pesquisas NPS
- Notificacoes inteligentes via Slack, Teams e WhatsApp

## Tecnologias

**Backend**
- Node.js 20+
- Express.js 4.18
- TypeScript 5.5
- Prisma ORM 5.7
- PostgreSQL 15+
- JWT Authentication
- Zod Validation

**Frontend**
- React 18.3
- TypeScript 5.5
- Vite 5.0
- Tailwind CSS 3.4
- React Router 6.21
- Axios

**Seguranca**
- Helmet.js
- CORS
- Rate Limiting  
- Bcrypt
- Input Validation

## Instalacao

### Pre-requisitos
- Node.js 20 ou superior
- PostgreSQL 15 ou superior
- npm ou yarn

### Backend

```bash
cd backend
npm install
```

Configure o arquivo .env:

```
DATABASE_URL="postgresql://user:password@localhost:5432/helpdeskflow"
JWT_SECRET="your_secret_key"
PORT=3001
```

Execute as migrations:

```bash
npx prisma migrate dev
npx prisma generate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse http://localhost:5173

## Credenciais de Teste

| Funcao | Email | Senha |
|--------|-------|-------|
| Admin | admin@helpdeskflow.com | Admin123! |
| Atendente | attendant@helpdeskflow.com | Attendant123! |
| Usuario | user@helpdeskflow.com | User123! |

## API Endpoints

### Autenticacao
- POST /api/auth/login - Login de usuario
- POST /api/auth/register - Registro de novo usuario

### Chamados
- GET /api/tickets - Lista todos os chamados
- GET /api/tickets/:id - Detalhes de um chamado
- POST /api/tickets - Cria novo chamado
- PUT /api/tickets/:id - Atualiza chamado
- DELETE /api/tickets/:id - Remove chamado

### Dashboard
- GET /api/dashboard/stats - Estatisticas gerais
- GET /api/dashboard/charts - Dados para graficos

### IA - Chatbot
- POST /api/chatbot/message - Envia mensagem ao chatbot

### IA - Priorizacao
- POST /api/tickets/prioritize - Prioriza chamado automaticamente

### IA - NPS
- GET /api/feedback/nps - Lista pesquisas NPS
- POST /api/feedback/nps - Cria nova pesquisa
- GET /api/feedback/analysis - Analise de sentimentos

### Integracoes
- GET /api/integrations - Lista integracoes ativas
- POST /api/integrations/slack - Configura integracao Slack
- POST /api/integrations/teams - Configura integracao Teams
- POST /api/integrations/whatsapp - Configura WhatsApp Business

## Seguranca

- Autenticacao JWT com tokens seguros
- Senhas criptografadas com bcrypt
- Rate limiting para prevenir ataques
- Validacao de entrada com Zod
- Headers de seguranca com Helmet
- CORS configurado
- Protecao contra SQL injection via Prisma ORM

## Licenca

MIT License
