# 🏗️ Arquitetura do Sistema

## Diagrama de Fluxo Geral

```mermaid
graph TB
    subgraph "Frontend - React"
        A[React App] --> B[React Router]
        B --> C[Pages]
        C --> D[Components]
        D --> E[API Client - Axios]
    end
    
    subgraph "Backend - Node.js + Express"
        E --> F[API Gateway]
        F --> G[Auth Middleware]
        G --> H[RBAC Middleware]
        H --> I[Rate Limiting]
        I --> J[Routes]
        J --> K[Controllers]
        K --> L[Services]
        L --> M[Prisma ORM]
        M --> N[(PostgreSQL)]
    end
    
    subgraph "External Services"
        L --> O[Slack API]
        L --> P[Teams API]
        L --> Q[Twilio - WhatsApp]
        L --> R[OpenAI API]
    end
    
    subgraph "Monitoring & Logs"
        K --> S[Winston Logger]
        K --> T[Prometheus Metrics]
    end
    
    style A fill:#61dafb
    style F fill:#68a063
    style N fill:#336791
    style S fill:#f39c12
    style T fill:#e74c3c
```

---

## Fluxo Detalhado por Camada

### 1️⃣ **Frontend (React + Vite)**

```mermaid
graph LR
    A[User Action] --> B[React Component]
    B --> C{Authenticated?}
    C -->|No| D[Redirect to Login]
    C -->|Yes| E[API Call via Axios]
    E --> F[Add JWT Token]
    F --> G[Send Request]
    G --> H[Handle Response]
    H --> I[Update State]
    I --> J[Re-render UI]
```

**Responsabilidades:**
- 🎨 Renderização da interface
- 🔐 Gerenciamento de autenticação (JWT)
- 📊 Estado global (Context API)
- 🔄 Comunicação com backend via Axios

---

### 2️⃣ **API Gateway & Middlewares**

```mermaid
graph TB
    A[HTTP Request] --> B[Helmet - Security Headers]
    B --> C[CORS - Cross-Origin]
    C --> D[Body Parser]
    D --> E[Rate Limiting]
    E --> F{Protected Route?}
    F -->|Yes| G[Auth Middleware]
    F -->|No| H[Public Route]
    G --> I{Valid JWT?}
    I -->|No| J[401 Unauthorized]
    I -->|Yes| K[RBAC Check]
    K --> L{Has Permission?}
    L -->|No| M[403 Forbidden]
    L -->|Yes| N[Route Handler]
    H --> N
```

**Middlewares em ordem:**
1. **Helmet**: Adiciona headers de segurança
2. **CORS**: Controla origens permitidas
3. **Body Parser**: Parse JSON/form-data
4. **Rate Limiting**: Limita requisições por IP
5. **Auth Middleware**: Valida JWT
6. **RBAC Middleware**: Verifica permissões

---

### 3️⃣ **Controllers → Services → Database**

```mermaid
sequenceDiagram
    participant C as Controller
    participant S as Service
    participant P as Prisma ORM
    participant DB as PostgreSQL
    participant L as Logger
    
    C->>+S: ticketService.create(data)
    S->>L: Log request
    S->>+P: prisma.ticket.create()
    P->>+DB: INSERT INTO tickets
    DB-->>-P: Return ticket
    P-->>-S: Return ticket object
    S->>L: Log success
    S->>S: Send notification (async)
    S-->>-C: Return ticket
    C->>L: Log response
```

**Separação de Responsabilidades:**

| Camada | Responsabilidade | Exemplo |
|--------|------------------|---------|
| **Controller** | Receber request, validar entrada, retornar response | `TicketController.create()` |
| **Service** | Lógica de negócio, orquestração | `TicketService.create()` |
| **Prisma** | Queries ao banco, transactions | `prisma.ticket.create()` |
| **Database** | Armazenamento persistente | PostgreSQL |

---

### 4️⃣ **Fluxo de Autenticação**

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth Controller
    participant S as Auth Service
    participant DB as Database
    
    U->>F: Enter credentials
    F->>+A: POST /api/auth/login
    A->>+S: authService.login()
    S->>+DB: Find user by email
    DB-->>-S: Return user
    S->>S: Compare password (bcrypt)
    alt Password valid
        S->>S: Generate JWT
        S-->>-A: Return { token, user }
        A-->>-F: 200 OK
        F->>F: Store token in localStorage
        F-->>U: Redirect to dashboard
    else Password invalid
        S-->>A: Throw error
        A-->>F: 401 Unauthorized
        F-->>U: Show error message
    end
```

---

### 5️⃣ **Fluxo de Criação de Ticket com IA**

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant T as Ticket Controller
    participant TS as Ticket Service
    participant AI as AI Service
    participant N as Notification Service
    participant DB as Database
    
    U->>F: Fill ticket form
    F->>+T: POST /api/tickets
    T->>+TS: createTicket(data)
    TS->>+AI: analyzePriority(description)
    AI->>AI: NLP Analysis
    AI-->>-TS: Return priority
    TS->>+DB: Save ticket
    DB-->>-TS: Return ticket
    TS->>+N: sendNotifications(ticket)
    N->>N: Send to Slack
    N->>N: Send to Teams
    N-->>-TS: Notifications sent
    TS-->>-T: Return ticket
    T-->>-F: 201 Created
    F-->>U: Show success message
```

---

### 6️⃣ **Fluxo de Integração com Serviços Externos**

```mermaid
graph TB
    A[Ticket Event] --> B{Integration Active?}
    B -->|Slack| C[Slack Service]
    B -->|Teams| D[Teams Service]
    B -->|WhatsApp| E[Twilio Service]
    
    C --> F[Format Message]
    D --> G[Format Card]
    E --> H[Format Template]
    
    F --> I[POST to Slack API]
    G --> J[POST to Teams Webhook]
    H --> K[POST to Twilio API]
    
    I --> L{Success?}
    J --> L
    K --> L
    
    L -->|Yes| M[Log Success]
    L -->|No| N[Log Error]
    N --> O[Retry Queue]
```

**Integrações Implementadas:**
- **Slack**: Blocks API para mensagens ricas
- **Microsoft Teams**: Adaptive Cards
- **WhatsApp**: Twilio Business API

---

### 7️⃣ **Fluxo de Chatbot com IA**

```mermaid
graph LR
    A[User Message] --> B[Chatbot Controller]
    B --> C[Chatbot Service]
    C --> D{Message Type?}
    
    D -->|Question| E[OpenAI API]
    D -->|Command| F[Parse Command]
    
    E --> G[Generate Response]
    F --> H[Execute Action]
    
    G --> I[Save to ChatMessage]
    H --> I
    
    I --> J[Return Response]
    J --> K[Frontend Display]
```

---

## 📁 Estrutura de Pastas Detalhada

```
backend/
├── src/
│   ├── controllers/           # Camada de controle (HTTP handlers)
│   │   ├── auth.controller.ts
│   │   ├── ticket.controller.ts
│   │   ├── chatbot.controller.ts
│   │   └── integration.controller.ts
│   │
│   ├── services/              # Lógica de negócio
│   │   ├── auth.service.ts
│   │   ├── ticket.service.ts
│   │   ├── ai.service.ts
│   │   ├── notification.service.ts
│   │   └── integration.service.ts
│   │
│   ├── middlewares/           # Middlewares Express
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── metrics.middleware.ts
│   │
│   ├── routes/                # Definição de rotas
│   │   ├── auth.routes.ts
│   │   ├── ticket.routes.ts
│   │   ├── chatbot.routes.ts
│   │   └── index.ts
│   │
│   ├── types/                 # Tipos TypeScript
│   │   ├── express.d.ts
│   │   └── models.ts
│   │
│   ├── utils/                 # Utilitários
│   │   ├── logger.ts
│   │   ├── validation.ts
│   │   └── crypto.ts
│   │
│   └── server.ts              # Entry point
│
├── prisma/
│   ├── schema.prisma          # Schema do banco
│   ├── migrations/            # Histórico de migrations
│   └── seed.ts                # Dados iniciais
│
└── tests/                     # Testes
    ├── unit/
    ├── integration/
    └── e2e/

frontend/
├── src/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── common/
│   │   ├── layout/
│   │   └── tickets/
│   │
│   ├── pages/                 # Páginas/Rotas
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Tickets.tsx
│   │   └── TicketDetails.tsx
│   │
│   ├── services/              # API Client
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   └── ticket.service.ts
│   │
│   ├── hooks/                 # Custom React Hooks
│   │   ├── useAuth.ts
│   │   └── useTickets.ts
│   │
│   ├── context/               # Context API
│   │   └── AuthContext.tsx
│   │
│   ├── types/                 # Tipos TypeScript
│   │   └── models.ts
│   │
│   └── App.tsx                # Entry point
│
└── tests/                     # Testes
    ├── unit/
    └── e2e/
```

---

## 🔧 Padrões de Projeto Utilizados

### **MVC (Model-View-Controller)**
- **Model**: Prisma schema + Database
- **View**: React Components
- **Controller**: Express Controllers

### **Repository Pattern**
```typescript
// Service usa Prisma como repository
class TicketService {
  async findAll() {
    return prisma.ticket.findMany();
  }
}
```

### **Dependency Injection**
```typescript
// Controllers recebem services como dependência
class TicketController {
  constructor(private ticketService: TicketService) {}
}
```

### **Factory Pattern**
```typescript
// Criação de notificações
class NotificationFactory {
  create(type: 'slack' | 'teams' | 'whatsapp') {
    // ...
  }
}
```

---

## 🚀 Fluxo de Deploy

```mermaid
graph LR
    A[Git Push] --> B[GitHub Actions]
    B --> C{Tests Pass?}
    C -->|No| D[Notify Developer]
    C -->|Yes| E[Build]
    E --> F[Docker Image]
    F --> G{Environment?}
    G -->|Frontend| H[Vercel Deploy]
    G -->|Backend| I[Render Deploy]
    G -->|Database| J[Neon.tech]
    H --> K[Production]
    I --> K
    J --> K
```

---

## 📊 Monitoramento e Observabilidade

```mermaid
graph TB
    A[Application] --> B[Winston Logger]
    A --> C[Prometheus Metrics]
    A --> D[Error Tracking]
    
    B --> E[CloudWatch / Logs]
    C --> F[Grafana Dashboard]
    D --> G[Sentry]
    
    E --> H[Alerts]
    F --> H
    G --> H
```

---

## 🔐 Segurança em Camadas

| Camada | Mecanismo | Implementação |
|--------|-----------|---------------|
| **Transport** | HTTPS/TLS | Certificado SSL/TLS |
| **Authentication** | JWT | Token com 24h de validade |
| **Authorization** | RBAC | 3 roles: USER, ATTENDANT, ADMIN |
| **Input Validation** | Zod | Schema validation |
| **Password** | bcrypt | 12 rounds de hash |
| **Rate Limiting** | express-rate-limit | 100 req/15min por IP |
| **Headers** | Helmet | XSS, CSP, HSTS |
| **Database** | Prisma | Prepared statements |

---

## 🎯 Performance

### Otimizações Implementadas:
- ✅ **Code Splitting** no frontend (Vite)
- ✅ **Lazy Loading** de componentes React
- ✅ **Índices de banco** otimizados
- ✅ **Connection pooling** (Prisma)
- ✅ **Compressão** de respostas HTTP

### Otimizações Recomendadas:
- 🔄 **Redis** para cache de queries
- 🔄 **CDN** para assets estáticos
- 🔄 **BullMQ** para processamento assíncrono
- 🔄 **GraphQL** para reduzir over-fetching

---

**Documentação mantida por: Márcio Gil**
