#  HelpDeskFlow: Sistema Profissional de Gerenciamento de Chamados com IA

O **HelpDeskFlow** é uma solução empresarial completa para a gestão e rastreabilidade de solicitações internas (tickets), desenvolvida com as melhores práticas de mercado e tecnologias de ponta. O sistema se diferencia pela sua **Inteligência Artificial (IA)** integrada para triagem e priorização automáticas, robustez em segurança (RBAC) e compromisso com a acessibilidade (WCAG 2.1 AA).

---

##  Stack Tecnológico (Full-Stack)

Desenvolvido em uma arquitetura moderna e escalável, utilizando **TypeScript** de ponta a ponta.

| Categoria | Tecnologia | Versão | Descrição Técnica |
|-----------|-----------|--------|-------------------|
| **Linguagem** | TypeScript | 5.5 | Tipagem estática robusta em todo o projeto |
| **Backend** | Node.js | 20+ | Runtime server-side para alto desempenho |
| **Frontend** | React | 18.3 | Biblioteca UI declarativa e modular (SPA) |
| **Database** | PostgreSQL | 15+ | Banco de dados relacional seguro e escalável |
| **ORM** | Prisma | 5.7 | ORM moderno com type-safety e migrations |
| **Styling** | Tailwind CSS | 3.4 | Framework CSS utilitário focado em performance e customização |

---

##  Solução e Destaques Técnicos

O HelpDeskFlow resolve o problema da gestão caótica de solicitações, oferecendo:

###  Inteligência Artificial (IA) para Triagem

O sistema utiliza análise semântica para otimizar o fluxo de trabalho do atendente:

- **Chatbot Contextual**: Guia o usuário na abertura do chamado, coletando informações essenciais.
- **Priorização Inteligente**: Analisa o conteúdo da descrição em tempo real, utilizando um algoritmo de palavras-chave críticas e score de confiança.
  - _Exemplo_: Se a descrição contiver "parado" ou "não funciona", a IA sugere **Prioridade: Urgente**.
- **Categorização Automática**: Sugere o departamento responsável (TI, RH, Financeiro, etc.) com base na análise semântica do texto.
- **Geração de Título**: Cria um título conciso para o ticket, a partir da descrição longa.

###  Segurança e Autorização (Padrão Corporativo)

A segurança é um pilar central, utilizando práticas recomendadas para sistemas empresariais:

- **Autenticação Stateless**: Uso de **JWT** (JSON Web Token) para garantir que o servidor não armazene sessões.
- **Criptografia Robusta**: Senhas hasheadas com **bcrypt** (12 rounds) para máxima proteção.
- **RBAC (Role-Based Access Control)**: Controle de permissões rigoroso com 3 papéis:
  - **Administrador**: Controle total (CRUD em todos os módulos).
  - **Atendente**: Gerencia tickets atribuídos e interage com o cliente.
  - **Usuário**: Cria tickets e acompanha apenas os seus.
- **Proteção de API**: Rate Limiting para prevenir ataques de força bruta e middlewares de segurança (Helmet, CORS).

###  Integrações Externas (Webhooks)

Comunicação em tempo real para otimizar a notificação das equipes:

- **Slack**: Notificações formatadas com a Slack Blocks API, incluindo botões de ação rápida.
- **Microsoft Teams**: Uso de MessageCards interativos e coloridos por nível de prioridade.
- **WhatsApp Business (Twilio API)**: Envio de mensagens formatadas para atualizações de status.

###  Dashboard, Métricas e NPS

- **Analytics em Tempo Real**: Dashboard completo com gráficos de distribuição por Categoria, Prioridade e Status.
- **Net Promoter Score (NPS)**: Cálculo automático da satisfação pós-atendimento, classificando usuários em _Promotores_, _Neutros_ e _Detratores_.
- **Relatórios PDF**: Geração de relatórios de tickets para auditoria e documentação, incluindo todo o histórico e anexos.

###  Acessibilidade (WCAG 2.1 AA)

Foco na inclusão de Pessoas com Deficiência (PCDs), garantindo uma interface utilizável por todos.

- **Conformidade Nível AA**: Atende aos requisitos da Web Content Accessibility Guidelines (WCAG) 2.1.
- **Navegação por Teclado**: Acesso completo a todas as funcionalidades usando apenas Tab, Enter e Esc.
- **Suporte a Screen Readers**: Uso de Labels ARIA e semântica HTML correta.
- **Contraste**: Razão de contraste mínima de 4.5:1 para garantir legibilidade.

---

##  Aplicação em Produção (Deploy)

As instâncias em produção estão ativas e disponíveis para testes (Utilize as credenciais de teste abaixo):

| Componente | Hospedagem | URL | Status |
|-----------|-----------|-----|--------|
| **Frontend** | Vercel (CDN Global) | https://help-desk-flow-frontend.vercel.app |  Online |
| **Backend API** | Render (REST API) | Disponível no link do Frontend |  Online |
| **Banco de Dados** | Neon.tech (PostgreSQL Gerenciado) | Serviço de Nuvem |  Online |

---

##  Credenciais de Teste

| Email | Senha | Role |
|-------|-------|------|
| admin@helpdeskflow.com | Admin@123 |  Administrador |
| joao.silva@helpdeskflow.com | Atendente@123 |  Atendente |
| carlos.oliveira@helpdeskflow.com | Usuario@123 |  Usuário |

---

##  Estrutura do Projeto e Arquitetura

O projeto segue um modelo de desenvolvimento coeso e modular, facilitando a manutenção e escalabilidade.

```
HelpDeskFlow/
 backend/                  # Servidor Node.js + Express
    prisma/               # Modelos, migrations e seed do DB
    src/
       controllers/      # Camada de controle (Business Logic)
       middleware/       # Autenticação JWT, RBAC e Erros
       services/         # Lógica de Serviço (IA, Integrações)
       routes/           # Definição e agrupamento das rotas
    server.ts             # Entry point do servidor
 frontend/                 # Aplicação React + Vite
    src/
       components/       # Componentes reutilizáveis
       pages/            # Rotas e Telas (Dashboard, Tickets, Login)
       services/         # Cliente HTTP (Axios)
       App.tsx           # Roteamento SPA
 README.md
```

---

##  Documentação da API (Endpoints Principais)

A API é RESTful e protegida por JWT em todas as rotas que requerem autenticação (`/api/*`).

| Módulo | Método | Endpoint | Descrição |
|--------|--------|----------|-----------|
| **Auth** | POST | `/api/auth/login` | Autenticação e geração de JWT |
| **Auth** | GET | `/api/auth/me` | Retorna dados do usuário autenticado |
| **Tickets** | POST | `/api/tickets` | Cria um novo chamado (necessita Auth) |
| **Tickets** | GET | `/api/tickets` | Lista tickets (com filtros avançados e paginação) |
| **Tickets** | PUT | `/api/tickets/:id` | Atualiza status, prioridade ou atribuição |
| **IA** | POST | `/api/chatbot/analyze` | Envia descrição para análise de IA (categoria/prioridade) |
| **NPS** | POST | `/api/feedback` | Registra avaliação pós-atendimento |
| **Admin** | GET | `/api/users` | Lista todos os usuários (necessita Role: Admin) |

---

##  Sobre o Desenvolvedor

Este projeto foi idealizado e desenvolvido por:

**Márcio Gil**

-  **Formação**: Estudante do 5º Período de Engenharia de Software
-  **Paixão**: Apaixonado por Educação, Inovação, Tecnologia e em constante luta por Justiça Social
-  **GitHub (Perfil)**: https://github.com/MarcioGil
-  **GitHub (Repositório)**: https://github.com/MarcioGil/Sistema-de-Chamados-Internos
-  **LinkedIn**: https://linkedin.com/in/márcio-gil-1b7669309
-  **Portfólio/CV**: https://marciogil.github.io/curriculum-vitae/

---

**Desenvolvido com  por Márcio Gil**