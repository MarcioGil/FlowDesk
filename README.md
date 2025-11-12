# 🎫 HelpDeskFlow: Sistema Profissional de Gerenciamento de Chamados com IA# HelpDeskFlow



O **HelpDeskFlow** é uma solução empresarial completa para a gestão e rastreabilidade de solicitações internas (tickets), desenvolvida com as melhores práticas de mercado e tecnologias de ponta. O sistema se diferencia pela sua **Inteligência Artificial (IA)** integrada para triagem e priorização automáticas, robustez em segurança (RBAC) e compromisso com a acessibilidade (WCAG 2.1 AA).Sistema de Help Desk com recursos de IA integrados.



---## Sobre o Projeto



## 💻 Stack Tecnológico (Full-Stack)Sistema completo para gerenciamento de chamados internos com 4 funcionalidades baseadas em Inteligencia Artificial:



Desenvolvido em uma arquitetura moderna e escalável, utilizando **TypeScript** de ponta a ponta.- **Chatbot Inteligente** - Respostas automaticas com base de conhecimento

- **Priorizacao Automatica** - Classificacao de urgencia por IA  

| Categoria | Tecnologia | Versão | Descrição Técnica |- **Sistema NPS** - Pesquisas de satisfacao com analise de sentimento

|-----------|-----------|--------|-------------------|- **Integracoes Empresariais** - Slack, Microsoft Teams e WhatsApp Business

| **Linguagem** | TypeScript | 5.5 | Tipagem estática robusta em todo o projeto |

| **Backend** | Node.js | 20+ | Runtime server-side para alto desempenho |## Funcionalidades

| **Frontend** | React | 18.3 | Biblioteca UI declarativa e modular (SPA) |

| **Database** | PostgreSQL | 15+ | Banco de dados relacional seguro e escalável |### Sistema Base

| **ORM** | Prisma | 5.7 | ORM moderno com type-safety e migrations |- Autenticacao JWT com controle de permissoes por funcao

| **Styling** | Tailwind CSS | 3.4 | Framework CSS utilitário focado em performance e customização |- Gestao completa de chamados com CRUD

- Dashboard com metricas em tempo real

---- Sistema de comentarios entre atendentes e usuarios

- Exportacao de relatorios em PDF

## 🎯 Solução e Destaques Técnicos- Gerenciamento de usuarios e permissoes



O HelpDeskFlow resolve o problema da gestão caótica de solicitações, oferecendo:### Recursos de IA

- Chatbot com respostas contextuais

### 🧠 Inteligência Artificial (IA) para Triagem- Priorizacao automatica de tickets por urgencia

- Analise de sentimento em pesquisas NPS

O sistema utiliza análise semântica para otimizar o fluxo de trabalho do atendente:- Notificacoes inteligentes via Slack, Teams e WhatsApp



- **Chatbot Contextual**: Guia o usuário na abertura do chamado, coletando informações essenciais.## Tecnologias

- **Priorização Inteligente**: Analisa o conteúdo da descrição em tempo real, utilizando um algoritmo de palavras-chave críticas e score de confiança.

  - _Exemplo_: Se a descrição contiver "parado" ou "não funciona", a IA sugere **Prioridade: Urgente**.**Backend**

- **Categorização Automática**: Sugere o departamento responsável (TI, RH, Financeiro, etc.) com base na análise semântica do texto.- Node.js 20+

- **Geração de Título**: Cria um título conciso para o ticket, a partir da descrição longa.- Express.js 4.18

- TypeScript 5.5

### 🔐 Segurança e Autorização (Padrão Corporativo)- Prisma ORM 5.7

- PostgreSQL 15+

A segurança é um pilar central, utilizando práticas recomendadas para sistemas empresariais:- JWT Authentication

- Zod Validation

- **Autenticação Stateless**: Uso de **JWT** (JSON Web Token) para garantir que o servidor não armazene sessões.

- **Criptografia Robusta**: Senhas hasheadas com **bcrypt** (12 rounds) para máxima proteção.**Frontend**

- **RBAC (Role-Based Access Control)**: Controle de permissões rigoroso com 3 papéis:- React 18.3

  - **Administrador**: Controle total (CRUD em todos os módulos).- TypeScript 5.5

  - **Atendente**: Gerencia tickets atribuídos e interage com o cliente.- Vite 5.0

  - **Usuário**: Cria tickets e acompanha apenas os seus.- Tailwind CSS 3.4

- **Proteção de API**: Rate Limiting para prevenir ataques de força bruta e middlewares de segurança (Helmet, CORS).- React Router 6.21

- Axios

### 🔗 Integrações Externas (Webhooks)

**Seguranca**

Comunicação em tempo real para otimizar a notificação das equipes:- Helmet.js

- CORS

- **Slack**: Notificações formatadas com a Slack Blocks API, incluindo botões de ação rápida.- Rate Limiting  

- **Microsoft Teams**: Uso de MessageCards interativos e coloridos por nível de prioridade.- Bcrypt

- **WhatsApp Business (Twilio API)**: Envio de mensagens formatadas para atualizações de status.- Input Validation



### ⭐ Dashboard, Métricas e NPS## Instalacao



- **Analytics em Tempo Real**: Dashboard completo com gráficos de distribuição por Categoria, Prioridade e Status.### Pre-requisitos

- **Net Promoter Score (NPS)**: Cálculo automático da satisfação pós-atendimento, classificando usuários em _Promotores_, _Neutros_ e _Detratores_.- Node.js 20 ou superior

- **Relatórios PDF**: Geração de relatórios de tickets para auditoria e documentação, incluindo todo o histórico e anexos.- PostgreSQL 15 ou superior

- npm ou yarn

### ♿ Acessibilidade (WCAG 2.1 AA)

### Backend

Foco na inclusão de Pessoas com Deficiência (PCDs), garantindo uma interface utilizável por todos.

```bash

- **Conformidade Nível AA**: Atende aos requisitos da Web Content Accessibility Guidelines (WCAG) 2.1.cd backend

- **Navegação por Teclado**: Acesso completo a todas as funcionalidades usando apenas Tab, Enter e Esc.npm install

- **Suporte a Screen Readers**: Uso de Labels ARIA e semântica HTML correta.```

- **Contraste**: Razão de contraste mínima de 4.5:1 para garantir legibilidade.

Configure o arquivo .env:

---

```

## 🚀 Aplicação em Produção (Deploy)DATABASE_URL="postgresql://user:password@localhost:5432/helpdeskflow"

JWT_SECRET="your_secret_key"

As instâncias em produção estão ativas e disponíveis para testes (Utilize as credenciais de teste abaixo):PORT=3001

```

| Componente | Hospedagem | URL | Status |

|-----------|-----------|-----|--------|Execute as migrations:

| **Frontend** | Vercel (CDN Global) | https://help-desk-flow-frontend.vercel.app | ✅ Online |

| **Backend API** | Render (REST API) | Disponível no link do Frontend | ✅ Online |```bash

| **Banco de Dados** | Neon.tech (PostgreSQL Gerenciado) | Serviço de Nuvem | ✅ Online |npx prisma migrate dev

npx prisma generate

---npm run dev

```

## 🔑 Credenciais de Teste

### Frontend

| Email | Senha | Role |

|-------|-------|------|```bash

| admin@helpdeskflow.com | Admin@123 | 👨‍💼 Administrador |cd frontend

| joao.silva@helpdeskflow.com | Atendente@123 | 🎧 Atendente |npm install

| carlos.oliveira@helpdeskflow.com | Usuario@123 | 👤 Usuário |npm run dev

```

---

Acesse http://localhost:5173

## 📁 Estrutura do Projeto e Arquitetura

## Credenciais de Teste

O projeto segue um modelo de desenvolvimento coeso e modular, facilitando a manutenção e escalabilidade.

| Funcao | Email | Senha |

```|--------|-------|-------|

HelpDeskFlow/| Admin | admin@helpdeskflow.com | Admin123! |

├── backend/                  # Servidor Node.js + Express| Atendente | attendant@helpdeskflow.com | Attendant123! |

│   ├── prisma/               # Modelos, migrations e seed do DB| Usuario | user@helpdeskflow.com | User123! |

│   ├── src/

│   │   ├── controllers/      # Camada de controle (Business Logic)## API Endpoints

│   │   ├── middleware/       # Autenticação JWT, RBAC e Erros

│   │   ├── services/         # Lógica de Serviço (IA, Integrações)### Autenticacao

│   │   └── routes/           # Definição e agrupamento das rotas- POST /api/auth/login - Login de usuario

│   └── server.ts             # Entry point do servidor- POST /api/auth/register - Registro de novo usuario

├── frontend/                 # Aplicação React + Vite

│   ├── src/### Chamados

│   │   ├── components/       # Componentes reutilizáveis- GET /api/tickets - Lista todos os chamados

│   │   ├── pages/            # Rotas e Telas (Dashboard, Tickets, Login)- GET /api/tickets/:id - Detalhes de um chamado

│   │   ├── services/         # Cliente HTTP (Axios)- POST /api/tickets - Cria novo chamado

│   │   └── App.tsx           # Roteamento SPA- PUT /api/tickets/:id - Atualiza chamado

└── README.md- DELETE /api/tickets/:id - Remove chamado

```

### Dashboard

---- GET /api/dashboard/stats - Estatisticas gerais

- GET /api/dashboard/charts - Dados para graficos

## 📚 Documentação da API (Endpoints Principais)

### IA - Chatbot

A API é RESTful e protegida por JWT em todas as rotas que requerem autenticação (`/api/*`).- POST /api/chatbot/message - Envia mensagem ao chatbot



| Módulo | Método | Endpoint | Descrição |### IA - Priorizacao

|--------|--------|----------|-----------|- POST /api/tickets/prioritize - Prioriza chamado automaticamente

| **Auth** | POST | `/api/auth/login` | Autenticação e geração de JWT |

| **Auth** | GET | `/api/auth/me` | Retorna dados do usuário autenticado |### IA - NPS

| **Tickets** | POST | `/api/tickets` | Cria um novo chamado (necessita Auth) |- GET /api/feedback/nps - Lista pesquisas NPS

| **Tickets** | GET | `/api/tickets` | Lista tickets (com filtros avançados e paginação) |- POST /api/feedback/nps - Cria nova pesquisa

| **Tickets** | PUT | `/api/tickets/:id` | Atualiza status, prioridade ou atribuição |- GET /api/feedback/analysis - Analise de sentimentos

| **IA** | POST | `/api/chatbot/analyze` | Envia descrição para análise de IA (categoria/prioridade) |

| **NPS** | POST | `/api/feedback` | Registra avaliação pós-atendimento |### Integracoes

| **Admin** | GET | `/api/users` | Lista todos os usuários (necessita Role: Admin) |- GET /api/integrations - Lista integracoes ativas

- POST /api/integrations/slack - Configura integracao Slack

---- POST /api/integrations/teams - Configura integracao Teams

- POST /api/integrations/whatsapp - Configura WhatsApp Business

## 👨‍💻 Sobre o Desenvolvedor

## Seguranca

Este projeto foi idealizado e desenvolvido por:

- Autenticacao JWT com tokens seguros

**Márcio Gil**- Senhas criptografadas com bcrypt

- Rate limiting para prevenir ataques

- 🎓 **Formação**: Estudante do 5º Período de Engenharia de Software- Validacao de entrada com Zod

- 💡 **Paixão**: Apaixonado por Educação, Inovação, Tecnologia e em constante luta por Justiça Social- Headers de seguranca com Helmet

- 🔗 **GitHub (Perfil)**: https://github.com/MarcioGil- CORS configurado

- 📂 **GitHub (Repositório)**: https://github.com/MarcioGil/Sistema-de-Chamados-Internos- Protecao contra SQL injection via Prisma ORM

- 💼 **LinkedIn**: https://linkedin.com/in/márcio-gil-1b7669309

- 🌐 **Portfólio/CV**: https://marciogil.github.io/curriculum-vitae/## Licenca



---MIT License


**Desenvolvido com ❤️ por Márcio Gil**
