import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@helpdeskflow.com');
    await page.fill('input[name="password"]', 'Admin@123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  });

  test('deve exibir métricas principais', async ({ page }) => {
    // Verificar cards de métricas
    await expect(page.locator('.metric-card:has-text("Total de Tickets")')).toBeVisible();
    await expect(page.locator('.metric-card:has-text("Abertos")')).toBeVisible();
    await expect(page.locator('.metric-card:has-text("Em Progresso")')).toBeVisible();
    await expect(page.locator('.metric-card:has-text("Concluídos")')).toBeVisible();
  });

  test('deve exibir gráficos', async ({ page }) => {
    // Verificar que gráficos estão presentes
    await expect(page.locator('.chart-container')).toBeVisible();
    
    // Verificar tipos de gráficos
    await expect(page.locator('.chart-tickets-by-status')).toBeVisible();
    await expect(page.locator('.chart-tickets-by-category')).toBeVisible();
  });

  test('deve exibir tickets recentes', async ({ page }) => {
    await expect(page.locator('h2:has-text("Tickets Recentes")')).toBeVisible();
    await expect(page.locator('.recent-tickets-list')).toBeVisible();
  });

  test('deve permitir ações rápidas', async ({ page }) => {
    // Verificar botões de ação rápida
    await expect(page.locator('button:has-text("Novo Ticket")')).toBeVisible();
    
    // Clicar em novo ticket
    await page.click('button:has-text("Novo Ticket")');
    await expect(page).toHaveURL('/tickets/new');
  });

  test('deve atualizar métricas em tempo real', async ({ page }) => {
    // Obter valor inicial
    const initialCount = await page.locator('.metric-card:has-text("Total de Tickets") .metric-value').textContent();
    
    // Criar novo ticket
    await page.goto('/tickets/new');
    await page.fill('input[name="title"]', 'Teste E2E');
    await page.fill('textarea[name="description"]', 'Ticket de teste');
    await page.selectOption('select[name="category"]', 'TI');
    await page.click('button[type="submit"]');
    
    // Voltar ao dashboard
    await page.goto('/dashboard');
    
    // Verificar que o contador aumentou
    const newCount = await page.locator('.metric-card:has-text("Total de Tickets") .metric-value').textContent();
    expect(parseInt(newCount!)).toBeGreaterThan(parseInt(initialCount!));
  });
});
