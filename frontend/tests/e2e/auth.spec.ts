import { test, expect } from '@playwright/test';

test.describe('Autenticação', () => {
  test('deve fazer login com sucesso', async ({ page }) => {
    await page.goto('/login');
    
    // Preencher formulário
    await page.fill('input[name="email"]', 'admin@helpdeskflow.com');
    await page.fill('input[name="password"]', 'Admin@123');
    
    // Clicar no botão de login
    await page.click('button[type="submit"]');
    
    // Aguardar redirecionamento
    await page.waitForURL('/dashboard');
    
    // Verificar que estamos na dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('deve mostrar erro com credenciais inválidas', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[name="email"]', 'invalid@email.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Verificar mensagem de erro
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText('Credenciais inválidas');
  });

  test('deve fazer logout', async ({ page }) => {
    // Fazer login primeiro
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@helpdeskflow.com');
    await page.fill('input[name="password"]', 'Admin@123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
    
    // Fazer logout
    await page.click('button[aria-label="User menu"]');
    await page.click('text=Sair');
    
    // Verificar redirecionamento para login
    await expect(page).toHaveURL('/login');
  });
});
