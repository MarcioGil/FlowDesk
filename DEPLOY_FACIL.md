# 🚀 DEPLOY BACKEND - PASSO A PASSO SIMPLES

## ✅ Pré-requisitos (Você já tem!)

- ✅ Código no GitHub: `MarcioGil/Sistema-de-Chamados-Internos`
- ✅ Arquivo `render.yaml` configurado
- ✅ Backend funcionando localmente
- ✅ Endpoint `/api/health` criado

---

## 📝 OPÇÃO 1: USAR NEON.TECH (RECOMENDADO - MAIS RÁPIDO)

### Passo 1: Criar Banco de Dados no Neon (2 minutos)

1. Acesse: https://console.neon.tech/
2. Clique em **"Sign in"** → Use sua conta do GitHub
3. Clique em **"Create Project"**
4. Preencha:
   ```
   Project name: helpdeskflow
   PostgreSQL version: 15 ou superior
   Region: US East (Ohio) ou mais próximo
   ```
5. Clique em **"Create Project"**

### Passo 2: Copiar Connection String (1 minuto)

1. Após criar, você verá **"Connection string"**
2. Certifique-se de que está selecionado **"Pooled connection"**
3. **COPIE** a connection string completa:
   ```
   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/helpdeskflow?sslmode=require
   ```
4. **Cole aqui para não perder**:
   ```
   ____________________________________________________________
   ```

### Passo 3: Rodar Migrations no Neon (2 minutos)

Vamos popular o banco com as tabelas:

1. No seu terminal (PowerShell), cole este comando:

```powershell
# Defina a DATABASE_URL temporariamente
$env:DATABASE_URL="[COLE_SUA_CONNECTION_STRING_AQUI]"

# Entre na pasta backend
cd "c:\Projeto - HelpDeskFlow - Sistema de Chamadas Internas\HelpDeskFlow\backend"

# Rode as migrations
npx prisma migrate deploy

# Popular banco com dados iniciais (admin, usuários teste, tickets)
npx prisma db seed
```

2. Você deve ver:
   ```
   ✅ Migrations aplicadas com sucesso!
   ✅ Banco populado com dados iniciais
   ```

---

### Passo 4: Deploy no Render (5 minutos)

1. Acesse: https://dashboard.render.com/
2. Faça login (use GitHub)
3. Clique em **"New +"** → **"Web Service"**
4. Clique em **"Connect a repository"** (autorize GitHub se necessário)
5. Selecione: **`MarcioGil/Sistema-de-Chamados-Internos`**
6. Clique em **"Connect"**

### Passo 5: Configurar o Serviço

Preencha exatamente assim:

```
Name: helpdeskflow-api
Region: Ohio (US East) - MESMA REGIÃO DO NEON
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npx prisma generate && npm run build
Start Command: npm start
Instance Type: Free
```

### Passo 6: Adicionar Variáveis de Ambiente

Role até **"Environment Variables"** e adicione:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | [Cole a connection string do Neon aqui] |
| `JWT_SECRET` | `mude_isso_em_producao_chave_super_segura_123` |
| `NODE_ENV` | `production` |
| `PORT` | `3333` |
| `FRONTEND_URL` | `https://helpdeskflow.vercel.app` |

### Passo 7: Deploy!

1. Clique em **"Create Web Service"**
2. Aguarde 5-10 minutos (vai aparecer logs do deploy)
3. Quando ver **"Your service is live 🎉"**, está pronto!

### Passo 8: Testar o Backend

1. Copie a URL gerada (algo como: `https://helpdeskflow-api.onrender.com`)
2. Teste no navegador:
   ```
   https://helpdeskflow-api.onrender.com/api/health
   ```
3. Deve retornar:
   ```json
   {
     "status": "ok",
     "timestamp": "2025-11-12T..."
   }
   ```

✅ **BACKEND NO AR!**

---

## 📝 OPÇÃO 2: USAR RENDER PARA BANCO + API (ALTERNATIVA)

Se preferir tudo no Render:

### Passo 1: Criar Banco no Render (3 minutos)

1. Acesse: https://dashboard.render.com/
2. Clique em **"New +"** → **"PostgreSQL"**
3. Preencha:
   ```
   Name: helpdeskflow-db
   Database: helpdeskflow
   User: helpdeskflow_user
   Region: Ohio (US East)
   Plan: Free
   ```
4. Clique em **"Create Database"**
5. **AGUARDE 2-3 MINUTOS**

### Passo 2: Copiar Internal Connection String

1. Na página do banco, vá em **"Info"**
2. Copie **"Internal Database URL"**:
   ```
   postgresql://helpdeskflow_user:xxx@dpg-xxx/helpdeskflow
   ```

### Passo 3: Rodar Migrations

Use o mesmo processo da Opção 1, Passo 3 (PowerShell).

### Passo 4: Deploy da API

Igual à Opção 1, Passos 4-8.

---

## 🎯 PRÓXIMO PASSO: CONECTAR FRONTEND

Após o backend estar no ar:

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto **"helpdeskflow"**
3. Vá em **"Settings"** → **"Environment Variables"**
4. Edite `VITE_API_URL`:
   - **Valor antigo**: `http://localhost:3333/api`
   - **Valor novo**: `https://helpdeskflow-api.onrender.com/api`
5. Clique em **"Save"**
6. Vá em **"Deployments"** → clique nos 3 pontinhos → **"Redeploy"**

---

## 🎉 TESTAR TUDO FUNCIONANDO

1. Acesse: https://helpdeskflow.vercel.app
2. Faça login:
   ```
   Email: admin@helpdesk.com
   Senha: admin123
   ```
3. Navegue pelo sistema
4. Crie um ticket
5. Veja o dashboard

✅ **SISTEMA COMPLETO NO AR!**

---

## 🚨 PROBLEMAS COMUNS

### Erro: "Cannot connect to database"

**Causa**: Connection string incorreta

**Solução**:
1. Verifique se copiou a connection string COMPLETA (incluindo `?sslmode=require` no Neon)
2. No Render, vá em **Environment** e confirme que `DATABASE_URL` está correta
3. Clique em **"Manual Deploy"** → **"Deploy latest commit"**

---

### Erro: "Application failed to respond"

**Causa**: Porta incorreta

**Solução**: Já está configurado no código:
```typescript
const PORT = process.env.PORT || 3333
```
O Render usa `process.env.PORT` automaticamente. ✅

---

### Erro: "Prisma Client not generated"

**Causa**: Build command não incluiu `prisma generate`

**Solução**: Já está no Build Command:
```
npm install && npx prisma generate && npm run build
```
✅

---

### Backend demora para responder (30s+)

**Causa**: Plano Free do Render "dorme" após inatividade

**Solução**: 
- Normal no plano Free
- Primeira requisição "acorda" o servidor
- Próximas requisições são rápidas
- Para resolver: upgrade para plano pago ($7/mês)

---

## 📋 CHECKLIST FINAL

Antes de considerar concluído:

- [ ] Neon.tech: Banco criado e connection string copiada
- [ ] Terminal: Migrations rodadas com sucesso (`npx prisma migrate deploy`)
- [ ] Terminal: Seed executado com sucesso (`npx prisma db seed`)
- [ ] Render: Web Service criado
- [ ] Render: Variáveis de ambiente configuradas
- [ ] Render: Deploy concluído (status "Live")
- [ ] Browser: `/api/health` retorna `{"status":"ok"}`
- [ ] Vercel: `VITE_API_URL` atualizada
- [ ] Vercel: Frontend redesployado
- [ ] App: Login funcionando
- [ ] App: Criação de ticket funcionando
- [ ] App: Dashboard mostrando métricas

---

## 🆘 PRECISA DE AJUDA?

Se travar em algum passo:

1. **Copie a mensagem de erro completa**
2. **Me diga em qual passo travou**
3. **Vou te ajudar a resolver!**

---

## ⏱️ TEMPO ESTIMADO TOTAL

- Criar banco (Neon): **2 min**
- Rodar migrations: **2 min**
- Deploy Render: **10 min**
- Atualizar Vercel: **3 min**
- Testar: **3 min**

**TOTAL: ~20 minutos** ⏱️

---

## 🎊 PARABÉNS!

Seu sistema completo está no ar:

- ✅ Frontend: Vercel
- ✅ Backend: Render
- ✅ Banco: Neon.tech
- ✅ Deploy automático via Git

Qualquer `git push` vai redesployar automaticamente! 🚀
