import { test, expect } from '@playwright/test';

test.describe('Gestão de Tickets', () => {
  // Fazer login antes de cada teste
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@helpdeskflow.com');
    await page.fill('input[name="password"]', 'Admin@123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  });

  test('deve criar um novo ticket', async ({ page }) => {
    // Navegar para página de criar ticket
    await page.goto('/tickets/new');
    
    // Preencher formulário
    await page.fill('input[name="title"]', 'Problema com impressora');
    await page.fill('textarea[name="description"]', 'A impressora do 3º andar não está imprimindo');
    await page.selectOption('select[name="category"]', 'TI');
    await page.selectOption('select[name="priority"]', '3'); // Alta
    
    // Submeter formulário
    await page.click('button[type="submit"]');
    
    // Verificar redirecionamento e sucesso
    await page.waitForURL(/\/tickets\/\w+/);
    await expect(page.locator('.success-message')).toContainText('Ticket criado com sucesso');
  });

  test('deve listar tickets existentes', async ({ page }) => {
    await page.goto('/tickets');
    
    // Verificar que a lista carregou
    await expect(page.locator('h1')).toContainText('Tickets');
    await expect(page.locator('.ticket-list')).toBeVisible();
    
    // Verificar que há pelo menos um ticket
    const tickets = page.locator('.ticket-item');
    await expect(tickets).not.toHaveCount(0);
  });

  test('deve filtrar tickets por status', async ({ page }) => {
    await page.goto('/tickets');
    
    // Aplicar filtro de status
    await page.selectOption('select[name="status"]', 'OPEN');
    await page.click('button:has-text("Filtrar")');
    
    // Verificar que apenas tickets abertos são exibidos
    const ticketStatuses = page.locator('.ticket-status');
    const count = await ticketStatuses.count();
    
    for (let i = 0; i < count; i++) {
      await expect(ticketStatuses.nth(i)).toContainText('Aberto');
    }
  });

  test('deve visualizar detalhes de um ticket', async ({ page }) => {
    await page.goto('/tickets');
    
    // Clicar no primeiro ticket da lista
    await page.click('.ticket-item:first-child');
    
    // Verificar que estamos na página de detalhes
    await expect(page).toHaveURL(/\/tickets\/\w+/);
    await expect(page.locator('.ticket-details')).toBeVisible();
    await expect(page.locator('.ticket-title')).toBeVisible();
    await expect(page.locator('.ticket-description')).toBeVisible();
  });

  test('deve atualizar status de um ticket', async ({ page }) => {
    await page.goto('/tickets');
    await page.click('.ticket-item:first-child');
    
    // Atualizar status
    await page.selectOption('select[name="status"]', 'IN_PROGRESS');
    await page.click('button:has-text("Atualizar")');
    
    // Verificar mensagem de sucesso
    await expect(page.locator('.success-message')).toContainText('Status atualizado');
    await expect(page.locator('.ticket-status')).toContainText('Em Progresso');
  });

  test('deve adicionar comentário a um ticket', async ({ page }) => {
    await page.goto('/tickets');
    await page.click('.ticket-item:first-child');
    
    // Adicionar comentário
    await page.fill('textarea[name="comment"]', 'Estou analisando o problema');
    await page.click('button:has-text("Enviar Comentário")');
    
    // Verificar que o comentário apareceu
    await expect(page.locator('.comment-list')).toContainText('Estou analisando o problema');
  });

  test('deve deletar um ticket (admin)', async ({ page }) => {
    await page.goto('/tickets');
    await page.click('.ticket-item:first-child');
    
    // Clicar em deletar
    await page.click('button:has-text("Deletar")');
    
    // Confirmar no modal
    await page.click('button:has-text("Confirmar")');
    
    // Verificar redirecionamento
    await page.waitForURL('/tickets');
    await expect(page.locator('.success-message')).toContainText('Ticket deletado');
  });
});
