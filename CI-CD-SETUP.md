# Guia de Configuração - CI/CD e Deploy

## GitHub Secrets Necessários

### Vercel (Frontend)
- `VERCEL_TOKEN` - Token de API do Vercel
- `VERCEL_ORG_ID` - ID da organização
- `VERCEL_PROJECT_ID` - ID do projeto
- `VITE_API_URL` - URL do backend em produção

### Render (Backend)
- `RENDER_SERVICE_ID` - ID do serviço no Render
- `RENDER_API_KEY` - Chave de API do Render
- `DATABASE_URL` - String de conexão PostgreSQL

### Codecov (Opcional)
- `CODECOV_TOKEN` - Token para upload de cobertura

---

## Executar Testes Localmente

### Backend
```bash
cd backend
npm test                 # Testes unitários
npm test:coverage        # Com cobertura
npm run lint            # Linting
```

### Frontend
```bash
cd frontend
npm test                 # Testes unitários (Vitest)
npm test:coverage       # Com cobertura
npm run e2e             # Testes E2E (Playwright)
npm run e2e:ui          # Playwright UI
npm run lint            # Linting
```

---

## CI/CD

Os workflows estão em `.github/workflows/`:

- `ci.yml` - Testes automatizados em PRs
- `deploy-frontend.yml` - Deploy para Vercel
- `deploy-backend.yml` - Deploy para Render

---

**Documentação completa:** Consulte ARCHITECTURE.md e DATABASE.md
