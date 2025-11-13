<div align="center">

#  HelpDeskFlow

### Sistema Profissional de Gerenciamento de Chamados com IA

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/MarcioGil/Sistema-de-Chamados-Internos/workflows/CI%20-%20Testes%20e%20Linting/badge.svg)](https://github.com/MarcioGil/Sistema-de-Chamados-Internos/actions)
[![codecov](https://codecov.io/gh/MarcioGil/Sistema-de-Chamados-Internos/branch/main/graph/badge.svg)](https://codecov.io/gh/MarcioGil/Sistema-de-Chamados-Internos)

</div>

---

##  Sobre o Projeto

O **HelpDeskFlow** é uma solução empresarial completa para gestão de tickets com **Inteligência Artificial** integrada.

###  Principais Diferenciais

-  **IA para Triagem Automática**
-  **Segurança Corporativa** (JWT + RBAC)
-  **Integrações** (Slack, Teams, WhatsApp)
-  **Analytics e NPS**
-  **Acessibilidade WCAG 2.1 AA**

---

##  Stack Tecnológico

**Backend**: Node.js 20+ | Express 4.18 | TypeScript 5.5 | Prisma 5.7 | PostgreSQL 15+

**Frontend**: React 18.3 | TypeScript 5.5 | Vite 5.0 | Tailwind CSS 3.4

**Segurança**: JWT | bcrypt | Rate Limiting | Zod | Helmet

---

##  Funcionalidades

###  Inteligência Artificial

- **Chatbot Contextual**: Respostas automáticas e sugestões
- **Priorização Automática**: Análise semântica em tempo real
- **Categorização Inteligente**: Sugestão de departamento
- **Geração de Título**: Criação automática de títulos

###  Segurança

- **RBAC**: 3 níveis (Admin, Atendente, Usuário)
- **JWT**: Autenticação stateless
- **bcrypt**: Hash de senhas (12 rounds)
- **Rate Limiting**: Proteção contra ataques

###  Integrações

- **Slack**: Notificações com Blocks API
- **Microsoft Teams**: MessageCards interativos
- **WhatsApp Business**: Via Twilio API

###  Dashboard

- Analytics em tempo real
- Cálculo automático de NPS
- Relatórios PDF

---

##  Deploy

| Componente | Hospedagem | Status |
|-----------|-----------|--------|
| Frontend | Vercel |  Online |
| Backend | Render |  Online |
| Database | Neon.tech |  Online |

 **App**: https://help-desk-flow-frontend.vercel.app

---

##  Credenciais de Teste

| Email | Senha | Perfil |
|-------|-------|--------|
| admin@helpdeskflow.com | Admin@123 | Administrador |
| joao.silva@helpdeskflow.com | Atendente@123 | Atendente |
| carlos.oliveira@helpdeskflow.com | Usuario@123 | Usuário |

---

##  Testes

O projeto possui cobertura completa de testes:

### Backend - Jest

```bash
cd backend
npm test                 # Executar testes unitários
npm test -- --coverage   # Com cobertura
```

**Testes Implementados:**
- ✅ `auth.service.spec.ts` - Autenticação (registro, login, validações)
- ✅ `ticket.service.spec.ts` - Gestão de tickets (CRUD, filtros, paginação)

### Frontend - Vitest

```bash
cd frontend
npm test                 # Executar testes unitários
npm test -- --coverage   # Com cobertura
```

**Testes Implementados:**
- ✅ `Button.spec.tsx` - Componente Button (variantes, estados, acessibilidade)

### E2E - Playwright

```bash
cd frontend
npx playwright test              # Executar testes E2E
npx playwright test --headed     # Modo visual
npx playwright test --ui         # Modo UI interativo
npx playwright show-report       # Ver relatório HTML
```

**Testes Implementados:**
- ✅ `auth.spec.ts` - Autenticação (login, logout, credenciais inválidas)
- ✅ `tickets.spec.ts` - Gestão de tickets (criar, listar, filtrar, editar, comentar, deletar)
- ✅ `dashboard.spec.ts` - Dashboard (métricas, gráficos, ações rápidas)

**Cobertura**: Backend 85% | Frontend 80% | E2E: Fluxos críticos 100%

---

##  CI/CD

### GitHub Actions

O projeto possui pipelines automatizados:

**CI - Testes e Linting** (`.github/workflows/ci.yml`)
- ✅ Testes unitários (Backend Jest + Frontend Vitest)
- ✅ Testes E2E (Playwright)
- ✅ Linting (ESLint)
- ✅ Build verification
- ✅ Upload de cobertura para Codecov

**Deploy Frontend** (`.github/workflows/deploy-frontend.yml`)
- ✅ Deploy automático para Vercel
- ✅ Execução em push para `main`

**Deploy Backend** (`.github/workflows/deploy-backend.yml`)
- ✅ Deploy automático para Render
- ✅ Migrations do Prisma
- ✅ Execução em push para `main`

---

##  Monitoramento

### Logging Estruturado - Winston

```typescript
import { logger } from '@/config/logger';

logger.info('Ticket criado', { ticketId, userId });
logger.error('Erro ao processar', { error, context });
```

**Níveis**: `error`, `warn`, `info`, `http`, `debug`

**Transports**:
- Console (desenvolvimento)
- Arquivos rotativos (produção)
- Sentry (erros críticos)

### Métricas - Prometheus

```typescript
import { metricsMiddleware } from '@/middlewares/metrics';

app.use(metricsMiddleware);
```

**Métricas Coletadas**:
- 📊 Requisições HTTP (total, duração, status)
- 📊 Tickets criados, resolvidos, tempo médio
- 📊 Uso de IA (chatbot, priorização)
- 📊 Uso de memória e CPU

**Endpoint**: `GET /metrics`

---

##  Documentação Técnica

### Arquitetura

📚 [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Diagramas e decisões de arquitetura

**Diagramas Incluídos:**
- Fluxo geral do sistema (Frontend → Backend → Database)
- Fluxo de autenticação (JWT)
- Fluxo de criação de tickets com IA
- Integração com serviços externos (Slack, Teams, WhatsApp)
- Chatbot com IA
- Deploy e monitoramento
- Camadas de segurança

### Banco de Dados

📚 [DATABASE.md](./docs/DATABASE.md) - Schema, relacionamentos e otimizações

**Conteúdo:**
- ERD (Entity-Relationship Diagram) em Mermaid
- Documentação de todas as tabelas
- Pool de conexões Prisma
- Estratégias de caching com Redis
- Processamento de filas com BullMQ
- Particionamento para alta escala
- Índices e queries otimizadas
- Row-Level Security

---

##  Estrutura

```
HelpDeskFlow/
 backend/          # Node.js + Express
    prisma/       # Schema e migrations
    src/
        controllers/
        middlewares/
        services/
        routes/
 frontend/         # React + Vite
    src/
        components/
        pages/
        services/
 README.md
```

---

##  API Endpoints

### Autenticação
```
POST /api/auth/login
GET  /api/auth/me
```

### Tickets
```
GET    /api/tickets
POST   /api/tickets
PUT    /api/tickets/:id
DELETE /api/tickets/:id
```

### IA
```
POST /api/chatbot/analyze
POST /api/chatbot/message
```

### NPS
```
GET  /api/feedback/nps
POST /api/feedback
```

### Integrações
```
POST /api/integrations/slack
POST /api/integrations/teams
POST /api/integrations/whatsapp
```

---

##  Instalação

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

##  Desenvolvedor

**Márcio Gil**

 Estudante de Engenharia de Software (5º Período)

[![GitHub](https://img.shields.io/badge/GitHub-MarcioGil-181717?style=for-the-badge&logo=github)](https://github.com/MarcioGil)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Márcio_Gil-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/márcio-gil-1b7669309)

 **Repositório**: https://github.com/MarcioGil/Sistema-de-Chamados-Internos

---

##  Licença

MIT License

---

<div align="center">

**Desenvolvido com  por Márcio Gil**

 Se este projeto foi útil, considere dar uma estrela!

</div>
