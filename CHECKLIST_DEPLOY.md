# ✅ CHECKLIST DE DEPLOY - BACKEND

**Marque cada item conforme for completando!**

---

## 🗄️ PARTE 1: BANCO DE DADOS (5 minutos)

### Opção A: Neon.tech (Recomendado)

- [ ] 1. Acessei https://console.neon.tech/
- [ ] 2. Fiz login com GitHub
- [ ] 3. Cliquei em "Create Project"
- [ ] 4. Nomeei como "helpdeskflow"
- [ ] 5. Copiei a "Connection String" completa
- [ ] 6. Colei aqui para guardar:
  ```
  _____________________________________________________________
  ```

### OU Opção B: Render PostgreSQL

- [ ] 1. Acessei https://dashboard.render.com/
- [ ] 2. Cliquei em "New +" → "PostgreSQL"
- [ ] 3. Nomeei como "helpdeskflow-db"
- [ ] 4. Aguardei criar (2-3 min)
- [ ] 5. Copiei a "Internal Database URL"
- [ ] 6. Colei aqui para guardar:
  ```
  _____________________________________________________________
  ```

---

## 🔧 PARTE 2: CONFIGURAR BANCO (3 minutos)

### Via Script Automatizado (Mais Fácil!)

- [ ] 1. Abri PowerShell como Administrador
- [ ] 2. Naveguei até a pasta do projeto:
  ```powershell
  cd "c:\Projeto - HelpDeskFlow - Sistema de Chamadas Internas\HelpDeskFlow"
  ```
- [ ] 3. Executei o script:
  ```powershell
  .\setup-database.ps1
  ```
- [ ] 4. Colei a Connection String quando solicitado
- [ ] 5. Aguardei o script concluir
- [ ] 6. Vi a mensagem "✅ SETUP CONCLUÍDO!"

### OU Via Comandos Manuais

- [ ] 1. Abri PowerShell
- [ ] 2. Defini a DATABASE_URL:
  ```powershell
  $env:DATABASE_URL="[MINHA_CONNECTION_STRING]"
  ```
- [ ] 3. Naveguei para backend:
  ```powershell
  cd "c:\Projeto - HelpDeskFlow - Sistema de Chamadas Internas\HelpDeskFlow\backend"
  ```
- [ ] 4. Rodei migrations:
  ```powershell
  npx prisma migrate deploy
  ```
- [ ] 5. Populei o banco:
  ```powershell
  npx prisma db seed
  ```
- [ ] 6. Vi mensagens de sucesso

---

## 🚀 PARTE 3: DEPLOY NO RENDER (10 minutos)

### Criar Web Service

- [ ] 1. Acessei https://dashboard.render.com/
- [ ] 2. Cliquei em "New +" → "Web Service"
- [ ] 3. Cliquei em "Connect a repository"
- [ ] 4. Autorizei GitHub (se necessário)
- [ ] 5. Selecionei "MarcioGil/Sistema-de-Chamados-Internos"
- [ ] 6. Cliquei em "Connect"

### Configurar o Serviço

- [ ] 7. Preenchi **Name**: `helpdeskflow-api`
- [ ] 8. Selecionei **Region**: Ohio (US East) ou Oregon (US West)
- [ ] 9. Mantive **Branch**: `main`
- [ ] 10. Defini **Root Directory**: `backend`
- [ ] 11. Confirmei **Runtime**: `Node`
- [ ] 12. Configurei **Build Command**:
  ```
  npm install && npx prisma generate && npm run build
  ```
- [ ] 13. Configurei **Start Command**:
  ```
  npm start
  ```
- [ ] 14. Selecionei **Instance Type**: `Free`

### Adicionar Variáveis de Ambiente

Rolei até "Environment Variables" e adicionei:

- [ ] 15. `DATABASE_URL` = [Minha connection string]
- [ ] 16. `JWT_SECRET` = `mude_isso_em_producao_super_segura_123`
- [ ] 17. `NODE_ENV` = `production`
- [ ] 18. `PORT` = `3333`
- [ ] 19. `FRONTEND_URL` = `https://helpdeskflow.vercel.app`

### Deploy!

- [ ] 20. Cliquei em "Create Web Service"
- [ ] 21. Aguardei o deploy (5-10 minutos)
- [ ] 22. Vi a mensagem "Your service is live 🎉"

---

## 🧪 PARTE 4: TESTAR BACKEND (2 minutos)

- [ ] 1. Copiei a URL do serviço (ex: `https://helpdeskflow-api.onrender.com`)
- [ ] 2. Anotei aqui:
  ```
  _____________________________________________________________
  ```
- [ ] 3. Testei no navegador:
  ```
  [MINHA_URL]/api/health
  ```
- [ ] 4. Vi a resposta:
  ```json
  {
    "status": "ok",
    "timestamp": "..."
  }
  ```
- [ ] 5. **BACKEND FUNCIONANDO!** ✅

---

## 🌐 PARTE 5: CONECTAR FRONTEND (3 minutos)

- [ ] 1. Acessei https://vercel.com/dashboard
- [ ] 2. Cliquei no projeto "helpdeskflow"
- [ ] 3. Fui em "Settings" → "Environment Variables"
- [ ] 4. Encontrei `VITE_API_URL`
- [ ] 5. Cliquei em "Edit"
- [ ] 6. Atualizei o valor para:
  ```
  [MINHA_URL_DO_RENDER]/api
  ```
  (Exemplo: `https://helpdeskflow-api.onrender.com/api`)
- [ ] 7. Cliquei em "Save"
- [ ] 8. Fui em "Deployments"
- [ ] 9. Cliquei nos 3 pontinhos do último deploy
- [ ] 10. Cliquei em "Redeploy"
- [ ] 11. Confirmei o redeploy
- [ ] 12. Aguardei 1-2 minutos

---

## 🎉 PARTE 6: TESTAR SISTEMA COMPLETO (5 minutos)

- [ ] 1. Acessei https://helpdeskflow.vercel.app
- [ ] 2. Vi a tela de login
- [ ] 3. Fiz login:
  - Email: `admin@helpdesk.com`
  - Senha: `admin123`
- [ ] 4. Vi o Dashboard com métricas
- [ ] 5. Cliquei em "Novo Chamado"
- [ ] 6. Criei um ticket de teste
- [ ] 7. Vi o ticket na lista
- [ ] 8. Abri o ticket
- [ ] 9. Adicionei um comentário
- [ ] 10. Testei upload de PDF
- [ ] 11. Vi o dashboard atualizado
- [ ] 12. Testei filtros de tickets
- [ ] 13. **TUDO FUNCIONANDO!** ✅

---

## 🏆 RESULTADO FINAL

Quando TODOS os itens estiverem marcados:

- ✅ Banco de dados configurado e populado
- ✅ Backend rodando no Render
- ✅ Frontend conectado ao backend
- ✅ Sistema 100% funcional na web
- ✅ Deploy automático configurado (qualquer git push redesploya)

---

## 📊 PROGRESSO

Conte quantos itens você marcou:

- **Parte 1**: ___/6 itens
- **Parte 2**: ___/6 itens
- **Parte 3**: ___/22 itens
- **Parte 4**: ___/5 itens
- **Parte 5**: ___/12 itens
- **Parte 6**: ___/13 itens

**TOTAL**: ___/64 itens ✅

---

## 🆘 TRAVOU EM ALGUM PASSO?

**Me diga:**
1. Em qual PARTE você está
2. Qual ITEM está travado
3. Qual MENSAGEM DE ERRO apareceu (se houver)

**Vou te ajudar a resolver!** 💪

---

## 📱 INFORMAÇÕES IMPORTANTES

### URLs do Sistema

```
Frontend: https://helpdeskflow.vercel.app
Backend:  https://helpdeskflow-api.onrender.com
Health:   https://helpdeskflow-api.onrender.com/api/health
```

### Usuários de Teste

```
👤 ADMIN
Email: admin@helpdesk.com
Senha: admin123

👤 ATENDENTE
Email: maria@helpdesk.com
Senha: maria123

👤 USUÁRIO
Email: joao@helpdesk.com
Senha: joao123
```

### Repositório

```
GitHub: https://github.com/MarcioGil/Sistema-de-Chamados-Internos
```

---

**Boa sorte! Você consegue! 💪🚀**
