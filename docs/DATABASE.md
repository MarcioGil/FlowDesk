# 📊 Documentação do Banco de Dados

## Diagrama ERD (Entity-Relationship Diagram)

```mermaid
erDiagram
    User ||--o{ Ticket : "cria"
    User ||--o{ Ticket : "atende"
    User ||--o{ Comment : "escreve"
    User ||--o{ TicketHistory : "registra"
    User ||--o{ Feedback : "avalia"
    User ||--o{ ChatMessage : "envia"
    
    Ticket ||--o{ Comment : "possui"
    Ticket ||--o{ TicketHistory : "tem histórico"
    Ticket ||--o| Feedback : "recebe"
    
    User {
        uuid id PK
        string name
        string email UK
        string passwordHash
        enum role
        boolean active
        datetime createdAt
        datetime updatedAt
    }
    
    Ticket {
        uuid id PK
        string title
        text description
        enum category
        enum status
        int priority
        array attachments
        uuid createdById FK
        uuid assignedToId FK
        datetime createdAt
        datetime updatedAt
    }
    
    Comment {
        uuid id PK
        text message
        uuid ticketId FK
        uuid userId FK
        datetime createdAt
    }
    
    TicketHistory {
        uuid id PK
        uuid ticketId FK
        enum oldStatus
        enum newStatus
        uuid changedById FK
        datetime changedAt
    }
    
    Integration {
        uuid id PK
        enum type
        string name
        string webhookUrl
        string apiKey
        boolean active
        json config
        datetime createdAt
        datetime updatedAt
    }
    
    Feedback {
        uuid id PK
        uuid ticketId FK UK
        uuid userId FK
        enum rating
        int npsScore
        text comment
        datetime createdAt
    }
    
    ChatMessage {
        uuid id PK
        string sessionId
        uuid userId FK
        text message
        boolean isBot
        json metadata
        datetime createdAt
    }
```

---

## 📋 Descrição das Tabelas

### **Users** (Usuários)
Armazena informações de todos os usuários do sistema.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único |
| name | String | Nome completo |
| email | String | Email (único) |
| passwordHash | String | Senha criptografada com bcrypt |
| role | Enum | Papel: USER, ATTENDANT, ADMIN |
| active | Boolean | Status ativo/inativo |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

**Índices**: `email` (único)

---

### **Tickets** (Chamados)
Registra todos os chamados/tickets do sistema.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único |
| title | String | Título do chamado |
| description | Text | Descrição detalhada |
| category | Enum | TI, RH, FINANCEIRO, COMPRAS, INFRAESTRUTURA |
| status | Enum | OPEN, IN_ANALYSIS, IN_PROGRESS, COMPLETED, CANCELLED |
| priority | Integer | 1=Baixa, 2=Média, 3=Alta, 4=Urgente |
| attachments | Array | URLs dos anexos |
| createdById | UUID | FK para User (criador) |
| assignedToId | UUID | FK para User (atendente) |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

**Índices**: `status`, `category`, `createdById`, `assignedToId`

---

### **Comments** (Comentários)
Comentários feitos em tickets.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único |
| message | Text | Conteúdo do comentário |
| ticketId | UUID | FK para Ticket |
| userId | UUID | FK para User |
| createdAt | DateTime | Data de criação |

**Índices**: `ticketId`

**Cascata**: DELETE on Ticket delete

---

### **TicketHistory** (Histórico de Tickets)
Registra todas as mudanças de status dos tickets.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único |
| ticketId | UUID | FK para Ticket |
| oldStatus | Enum | Status anterior |
| newStatus | Enum | Novo status |
| changedById | UUID | FK para User (quem alterou) |
| changedAt | DateTime | Data da mudança |

**Índices**: `ticketId`

**Cascata**: DELETE on Ticket delete

---

### **Integrations** (Integrações)
Configurações de integrações externas.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único |
| type | Enum | SLACK, TEAMS, WHATSAPP |
| name | String | Nome da integração |
| webhookUrl | String | URL do webhook |
| apiKey | String | Chave de API |
| active | Boolean | Status ativo/inativo |
| config | JSON | Configurações específicas |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

---

### **Feedbacks** (Avaliações NPS)
Avaliações de satisfação dos usuários.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único |
| ticketId | UUID | FK para Ticket (único) |
| userId | UUID | FK para User |
| rating | Enum | VERY_POOR, POOR, AVERAGE, GOOD, EXCELLENT |
| npsScore | Integer | Pontuação NPS (0-10) |
| comment | Text | Comentário opcional |
| createdAt | DateTime | Data de criação |

**Índices**: `ticketId` (único), `rating`

**Cascata**: DELETE on Ticket delete

---

### **ChatMessages** (Mensagens do Chatbot)
Histórico de conversas com o chatbot de IA.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único |
| sessionId | String | ID da sessão de chat |
| userId | UUID | FK para User (opcional) |
| message | Text | Conteúdo da mensagem |
| isBot | Boolean | Se é mensagem do bot |
| metadata | JSON | Sugestões, análises, etc |
| createdAt | DateTime | Data de criação |

**Índices**: `sessionId`, `userId`

---

## 🔗 Relacionamentos

### **User → Ticket**
- **1:N** - Um usuário pode criar vários tickets (`ticketsCreated`)
- **1:N** - Um usuário pode ser atribuído a vários tickets (`ticketsAssigned`)

### **User → Comment**
- **1:N** - Um usuário pode fazer vários comentários

### **User → TicketHistory**
- **1:N** - Um usuário pode registrar várias mudanças de status

### **User → Feedback**
- **1:N** - Um usuário pode dar várias avaliações

### **User → ChatMessage**
- **1:N** - Um usuário pode ter várias mensagens de chat

### **Ticket → Comment**
- **1:N** - Um ticket pode ter vários comentários

### **Ticket → TicketHistory**
- **1:N** - Um ticket pode ter várias entradas no histórico

### **Ticket → Feedback**
- **1:1** - Um ticket pode ter apenas uma avaliação

---

## 🔧 Configurações do Prisma

### Pool de Conexões

```typescript
// Configuração padrão do Prisma Client
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Pool configuration (via DATABASE_URL)
// postgresql://user:password@localhost:5432/database?connection_limit=10&pool_timeout=20
```

**Recomendações de Pool:**
- **Desenvolvimento**: 5-10 conexões
- **Produção (pequeno)**: 10-20 conexões
- **Produção (médio)**: 20-50 conexões
- **Produção (grande)**: 50-100 conexões

### Índices Criados

```sql
-- Índices principais para otimização de queries
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_category ON tickets(category);
CREATE INDEX idx_tickets_created_by ON tickets(created_by_id);
CREATE INDEX idx_tickets_assigned_to ON tickets(assigned_to_id);
CREATE INDEX idx_comments_ticket ON comments(ticket_id);
CREATE INDEX idx_ticket_history_ticket ON ticket_history(ticket_id);
CREATE INDEX idx_feedbacks_ticket ON feedbacks(ticket_id);
CREATE INDEX idx_feedbacks_rating ON feedbacks(rating);
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_user ON chat_messages(user_id);
```

---

## 🚀 Otimizações Futuras

### Caching (Recomendado)

```typescript
// Redis para cache de queries frequentes
import { Redis } from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASSWORD,
});

// Cache de dashboard stats
const cacheKey = `dashboard:stats:${userId}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

// ... fetch from database ...
await redis.setex(cacheKey, 300, JSON.stringify(stats)); // 5 min TTL
```

### Fila de Processamento (Sugestão)

```typescript
// BullMQ para processamento assíncrono
import { Queue, Worker } from 'bullmq';

// Fila para notificações
const notificationQueue = new Queue('notifications', {
  connection: { host: 'localhost', port: 6379 }
});

// Adicionar job quando ticket for criado
await notificationQueue.add('ticket-created', {
  ticketId: ticket.id,
  userId: ticket.createdById,
  integrations: ['slack', 'teams']
});

// Worker para processar notificações
const worker = new Worker('notifications', async (job) => {
  const { ticketId, integrations } = job.data;
  // Enviar notificações para Slack, Teams, WhatsApp
}, { connection: { host: 'localhost', port: 6379 } });
```

### Particionamento de Tabelas (Alta Escala)

```sql
-- Particionar tickets por data para melhor performance
CREATE TABLE tickets_2025_01 PARTITION OF tickets
FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE tickets_2025_02 PARTITION OF tickets
FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');
```

---

## 📈 Queries Otimizadas

### Dashboard Stats
```typescript
// Query otimizada com agregação
const stats = await prisma.$queryRaw`
  SELECT 
    status,
    COUNT(*) as count,
    AVG(priority) as avg_priority
  FROM tickets
  WHERE created_at >= NOW() - INTERVAL '30 days'
  GROUP BY status
`;
```

### Top Atendentes
```typescript
const topAttendants = await prisma.user.findMany({
  where: { role: 'ATTENDANT' },
  include: {
    _count: {
      select: { ticketsAssigned: true }
    }
  },
  orderBy: {
    ticketsAssigned: { _count: 'desc' }
  },
  take: 10
});
```

---

## 🔒 Segurança

### Prepared Statements
Prisma usa prepared statements automaticamente, protegendo contra SQL Injection.

### Row-Level Security (RLS)
```sql
-- Exemplo de RLS no PostgreSQL
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_tickets ON tickets
  FOR SELECT
  USING (
    created_by_id = current_setting('app.user_id')::uuid OR
    assigned_to_id = current_setting('app.user_id')::uuid
  );
```

---

## 📝 Migrations

```bash
# Criar nova migration
npx prisma migrate dev --name add_new_feature

# Aplicar migrations em produção
npx prisma migrate deploy

# Reset database (desenvolvimento)
npx prisma migrate reset

# Visualizar banco de dados
npx prisma studio
```

---

## 📊 Monitoramento de Queries

```typescript
// Prisma Query Logging
const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'warn' },
  ],
});

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Duration: ' + e.duration + 'ms');
});
```

---

**Documentação gerada automaticamente do schema Prisma**
