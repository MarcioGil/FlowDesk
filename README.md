<div align="center">

#  HelpDeskFlow

### Sistema Profissional de Gerenciamento de Chamados com IA

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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
