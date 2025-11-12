# 🎫 HelpDeskFlow — Sistema de Chamados Internos

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)](https://www.postgresql.org/)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-green)](https://www.w3.org/WAI/WCAG21/quickref/)

> **Sistema profissional de gerenciamento de chamados internos com foco em segurança e acessibilidade para PCDs**

---

## 👨‍💻 Sobre o Desenvolvedor

**Marcio Gil**  
🎓 Embaixador da Turma 14 - DIO Campus Expert  
🎓 Estudante de Engenharia de Software  
💡 Apaixonado por educação, inovação, tecnologia e justiça social

**Conecte-se:**
- 💼 [LinkedIn](https://linkedin.com/in/márcio-gil-1b7669309)
- 🌐 [Portfólio/CV](https://marciogil.github.io/curriculum-vitae/)
- 💻 [GitHub](https://github.com/MarcioGil)
- 📦 [Repositório do Projeto](https://github.com/MarcioGil/Sistema-de-Chamados-Internos.git)

---

## 📋 Sobre o Projeto

O **HelpDeskFlow** é um sistema completo e profissional de gerenciamento de chamados internos para empresas. Permite que funcionários abram solicitações para diferentes setores (TI, RH, Financeiro, Compras, Infraestrutura) com rastreabilidade completa, métricas de desempenho e controle de acesso baseado em roles.

**Desenvolvido com foco em segurança empresarial e acessibilidade completa para pessoas com deficiência (PCDs).**

### 🎯 Problema que Resolve

Empresas de todos os tamanhos enfrentam o desafio de gerenciar solicitações internas de forma organizada. O HelpDeskFlow oferece:
- ✅ Centralização de todas as solicitações
- ✅ Rastreabilidade completa do início ao fim
- ✅ Métricas para identificar gargalos
- ✅ Controle de acesso e permissões
- ✅ Histórico completo de cada chamado
- ✅ Interface acessível (WCAG 2.1 AA)

---

## 🚀 Funcionalidades Principais

### 👥 Autenticação e Perfis
- ✅ Login seguro com JWT
- ✅ 3 níveis de acesso: **Usuário**, **Atendente**, **Administrador**
- ✅ Controle de permissões (RBAC)
- ✅ Senhas criptografadas com bcrypt (12 rounds)

### 🎫 Gestão de Tickets
- ✅ Criar, editar e visualizar chamados
- ✅ Categorias: TI, RH, Financeiro, Compras, Infraestrutura
- ✅ 4 níveis de prioridade (Baixa, Média, Alta, Urgente)
- ✅ Atribuir responsáveis (atendentes)
- ✅ Atualizar status (Aberto → Em Análise → Em Progresso → Concluído)
- ✅ Sistema de comentários em tempo real
- ✅ Upload de arquivos PDF (até 10MB)
- ✅ Download e exclusão de anexos
- ✅ Histórico automático de mudanças
- ✅ Filtros: Todos, Meus Tickets, Atribuídos a Mim

### 📊 Dashboard e Métricas
- ✅ 4 cards de resumo (Total, Abertos, Em Progresso, Concluídos)
- ✅ Gráficos de tickets por categoria (com percentuais)
- ✅ Gráficos de tickets por prioridade (color-coded)
- ✅ Tabela dos 5 tickets mais recentes
- ✅ Botões de ação rápida (Novo Ticket, Meus Tickets, Atribuídos)
- ✅ Métricas em tempo real
- ✅ Interface responsiva

### 👤 Gerenciamento de Usuários (Admin)
- ✅ Listar todos os usuários
- ✅ Criar novos usuários
- ✅ Editar usuários existentes
- ✅ Ativar/desativar contas
- ✅ Alterar perfis e permissões
- ✅ Validação de email único
- ✅ Proteção contra auto-exclusão

### ♿ Acessibilidade (WCAG 2.1 AA)
- ✅ Navegação completa por teclado
- ✅ Labels ARIA para leitores de tela
- ✅ Contraste de cores adequado
- ✅ Foco visível em todos os elementos
- ✅ Mensagens de erro acessíveis
- ✅ Suporte a `prefers-reduced-motion`

---

## 🏗️ Arquitetura Técnica

### **Backend**
```
Node.js + Express + TypeScript
├── JWT Authentication
├── Prisma ORM (PostgreSQL)
├── Zod (validação)
├── Bcrypt (criptografia)
├── Helmet (segurança)
├── Rate Limiting (proteção contra ataques)
└── CORS configurado
```

### **Frontend**
```
React 18 + Vite + TypeScript
├── Zustand (gerenciamento de estado)
├── React Router (navegação)
├── Axios (requisições HTTP)
├── Tailwind CSS (estilização)
├── React Hook Form (formulários)
├── Recharts (gráficos)
└── Lucide Icons
```

### **Banco de Dados**
```sql
PostgreSQL
├── Users (autenticação e roles)
├── Tickets (chamados)
├── Comments (comentários)
└── TicketHistory (histórico de mudanças)
```

---

## 🌐 Demo

### Aplicação em Produção

> ⚠️ **Aguardando deploy**: URLs serão adicionadas após conclusão do deploy

- 🎨 **Frontend**: `[URL da Vercel]`
- 🔧 **Backend API**: `[URL do Render]/api`
- 📊 **Health Check**: `[URL do Render]/api/health`

### Usuários de Teste

| Email | Senha | Role |
|-------|-------|------|
| `admin@helpdeskflow.com` | `Admin@123` | 👨‍💼 Administrador |
| `joao.silva@helpdeskflow.com` | `Atendente@123` | 🎧 Atendente |
| `maria.santos@helpdeskflow.com` | `Atendente@123` | 🎧 Atendente |
| `carlos.oliveira@helpdeskflow.com` | `Usuario@123` | 👤 Usuário |
| `ana.paula@helpdeskflow.com` | `Usuario@123` | 👤 Usuário |

---

## 📦 Instalação e Configuração

### **Pré-requisitos**
- Node.js 20+ ([download](https://nodejs.org/))
- PostgreSQL 15+ ([download](https://www.postgresql.org/download/))
- npm ou yarn

### **1. Clone o repositório**
```bash
git clone https://github.com/MarcioGil/HelpDeskFlow.git
cd HelpDeskFlow
```

### **2. Configure o Backend**

```bash
cd backend
npm install

# Copie o arquivo de ambiente
cp .env.example .env

# Edite o .env com suas configurações
# DATABASE_URL="postgresql://user:password@localhost:5432/helpdeskflow"
# JWT_SECRET="sua_chave_secreta_super_segura"
```

**Importante**: Gere uma chave JWT forte:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### **3. Configure o Banco de Dados**

```bash
# Gera o cliente Prisma
npm run prisma:generate

# Executa as migrations
npm run prisma:migrate

# Popula o banco com dados de exemplo
npm run prisma:seed
```

### **4. Configure o Frontend**

```bash
cd ../frontend
npm install

# Copie o arquivo de ambiente
cp .env.example .env

# Configure a URL da API (se necessário)
# VITE_API_URL=http://localhost:3333/api
```

---

## 🖥️ Rodando o Projeto

### **Backend**
```bash
cd backend
npm run dev
# API rodando em http://localhost:3333
```

### **Frontend**
```bash
cd frontend
npm run dev
# Interface rodando em http://localhost:5173
```

---

## 👤 Usuários de Teste

Após rodar o seed, você terá acesso a:

| Email | Senha | Role |
|-------|-------|------|
| admin@helpdeskflow.com | Admin@123 | Administrador |
| joao.silva@helpdeskflow.com | Atendente@123 | Atendente |
| maria.santos@helpdeskflow.com | Atendente@123 | Atendente |
| carlos.oliveira@helpdeskflow.com | Usuario@123 | Usuário |
| ana.paula@helpdeskflow.com | Usuario@123 | Usuário |

---

## 🔒 Segurança Implementada

### **Autenticação e Autorização**
✅ **JWT (JSON Web Tokens)** com expiração de 7 dias  
✅ **Bcrypt** com 12 rounds para hash de senhas  
✅ **RBAC** (Role-Based Access Control) - 3 níveis de acesso  
✅ **Refresh tokens** para sessões longas  

### **Proteção de API**
✅ **Helmet.js** - Headers HTTP seguros  
✅ **Rate Limiting** - 5 tentativas de login em 15 minutos  
✅ **CORS** configurado com whitelist  
✅ **HPP** (HTTP Parameter Pollution) protection  
✅ **Request sanitization** - Previne NoSQL/SQL injection  

### **Validação e Sanitização**
✅ **Zod schemas** - Validação rigorosa de dados  
✅ **XSS Protection** - Sanitização de HTML/scripts maliciosos  
✅ **Input validation** - Todos os endpoints validados  
✅ **SQL Injection** prevenido com Prisma ORM  

### **Melhores Práticas**
✅ **Variáveis de ambiente** para credenciais  
✅ **Logs estruturados** de segurança  
✅ **HTTPS only** em produção  
✅ **Secrets não commitados** (.env no .gitignore)  
✅ **Timeout em requisições** HTTP  

### **Acessibilidade e Inclusão**
✅ **WCAG 2.1 Level AA** compliant  
✅ **Navegação por teclado** em todos os componentes  
✅ **ARIA labels** para leitores de tela  
✅ **Contraste de cores** adequado (4.5:1)  
✅ **Focus indicators** visíveis  
✅ **Skip links** para conteúdo principal  
✅ **Suporte a `prefers-reduced-motion`**  
✅ **Mensagens de erro descritivas** e acessíveis  

---

## 🎨 Telas do Sistema

### 1. **Login**
Interface de autenticação com validação e feedback acessível

### 2. **Home / Lista de Tickets**
Visualização de todos os chamados com filtros por status, categoria e atribuição

### 3. **Criar Novo Ticket**
Formulário completo com validação em tempo real

### 4. **Detalhe do Ticket**
Visualização completa com:
- Informações do ticket
- Comentários em tempo real
- Histórico de mudanças
- Ações (atribuir, mudar status, comentar)

### 5. **Dashboard**
Métricas e gráficos:
- Total de tickets por status
- Distribuição por categoria
- Tempo médio de resolução
- Desempenho por atendente
- Gráfico de tendência

### 6. **Painel Admin**
Gerenciamento de:
- Usuários (criar, editar, desativar)
- Categorias
- Permissões

---

## 📊 Modelo de Dados

```mermaid
erDiagram
    Users ||--o{ Tickets : creates
    Users ||--o{ Tickets : assigned_to
    Users ||--o{ Comments : writes
    Users ||--o{ TicketHistory : changes
    Tickets ||--o{ Comments : has
    Tickets ||--o{ TicketHistory : tracks
```

---

## 🚀 Deploy

### **Backend (Render / Railway / Fly.io)**
```bash
npm run build
npm start
```

### **Frontend (Vercel)**
```bash
npm run build
# Deploy a pasta dist/
```

### **Banco de Dados (Railway / Supabase)**
Configure a `DATABASE_URL` no ambiente de produção

---

## 📚 API Endpoints

### **Autenticação**
```
POST   /api/auth/register  - Registrar usuário
POST   /api/auth/login     - Login
GET    /api/auth/me        - Dados do usuário autenticado
```

### **Tickets**
```
GET    /api/tickets        - Listar tickets
GET    /api/tickets/:id    - Buscar ticket
POST   /api/tickets        - Criar ticket
PATCH  /api/tickets/:id    - Atualizar ticket
DELETE /api/tickets/:id    - Deletar ticket (Admin)
POST   /api/tickets/:id/comments - Adicionar comentário
```

### **Dashboard**
```
GET    /api/dashboard/metrics - Métricas gerais
GET    /api/dashboard/trend   - Tendência de tickets
```

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Bcrypt** - Criptografia de senhas
- **Zod** - Validação de schemas
- **Helmet** - Segurança HTTP
- **CORS** - Controle de origem
- **Express Rate Limit** - Proteção contra força bruta

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Zustand** - State management
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework CSS
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação
- **Recharts** - Gráficos
- **Lucide React** - Ícones
- **date-fns** - Manipulação de datas

---

## 📈 Diferenciais Técnicos

✅ **Arquitetura limpa e escalável**  
✅ **Código 100% TypeScript**  
✅ **RBAC (Role-Based Access Control)**  
✅ **Histórico completo de mudanças**  
✅ **Dashboard com métricas reais**  
✅ **Rate limiting e segurança robusta**  
✅ **Acessibilidade WCAG 2.1 AA**  
✅ **Testes preparados (estrutura)**  
✅ **Documentação completa**  
✅ **Deploy-ready**  

---

## 🎯 Roadmap Futuro

- [ ] Notificações em tempo real (WebSocket)
- [ ] Notificações por email
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Upload de múltiplos arquivos
- [ ] Tags personalizadas
- [ ] SLA (Service Level Agreement)
- [ ] Testes automatizados (Jest + Testing Library)
- [ ] CI/CD (GitHub Actions)
- [ ] Docker + Docker Compose
- [ ] Logs estruturados (Winston)

---

## 👨‍💻 Autor

**Márcio Gil**  
- GitHub: [@MarcioGil](https://github.com/MarcioGil)
- LinkedIn: [Márcio Gil](https://linkedin.com/in/marciogil)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📞 Suporte

Se tiver dúvidas ou problemas, abra uma [issue](https://github.com/MarcioGil/HelpDeskFlow/issues).

---

<div align="center">

**Desenvolvido com ❤️ e ☕ para resolver problemas reais de empresas**

⭐ Se este projeto foi útil, considere dar uma estrela!

</div>
