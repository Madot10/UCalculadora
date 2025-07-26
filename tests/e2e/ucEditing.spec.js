import { test, expect } from '@playwright/test';

test.describe('UCalculadora E2E Tests - UC Editing Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load calculator homepage correctly', async ({ page }) => {
    // Check main elements are present
    await expect(page.locator('h1')).toContainText('UCALCULADORA');
    await expect(page.locator('#ucValue')).toBeVisible();
    await expect(page.locator('#ucEditIcon')).toBeVisible();
    
    // Check main sections are present
    await expect(page.locator('text=SEDE')).toBeVisible();
    await expect(page.locator('text=CARRERA')).toBeVisible();
    await expect(page.locator('text=MATERIAS')).toBeVisible();
    await expect(page.locator('text=COOPERACIÓN')).toBeVisible();
  });

  test('should open UC edit modal when clicking edit icon', async ({ page }) => {
    // Click on UC edit icon
    await page.locator('#ucEditIcon').click();
    
    // Modal should be visible
    await expect(page.locator('#ucEditModal')).toBeVisible();
    await expect(page.locator('text=EDITAR VALOR UC')).toBeVisible();
    
    // Check modal sections
    await expect(page.locator('text=Valor UC Actual')).toBeVisible();
    await expect(page.locator('text=Valores para meses específicos')).toBeVisible();
    await expect(page.locator('#customUCInput')).toBeVisible();
    await expect(page.locator('#saveUCBtn')).toBeVisible();
    await expect(page.locator('#resetUCBtn')).toBeVisible();
  });

  test('should close UC edit modal when clicking close button', async ({ page }) => {
    // Open modal
    await page.locator('#ucEditIcon').click();
    await expect(page.locator('#ucEditModal')).toBeVisible();
    
    // Close modal
    await page.locator('.close').click();
    await expect(page.locator('#ucEditModal')).not.toBeVisible();
  });

  test('should close UC edit modal when pressing Escape key', async ({ page }) => {
    // Open modal
    await page.locator('#ucEditIcon').click();
    await expect(page.locator('#ucEditModal')).toBeVisible();
    
    // Press Escape
    await page.keyboard.press('Escape');
    await expect(page.locator('#ucEditModal')).not.toBeVisible();
  });

  test('should save custom UC value correctly', async ({ page }) => {
    // Open modal
    await page.locator('#ucEditIcon').click();
    
    // Enter custom UC value
    await page.locator('#customUCInput').fill('25.50');
    
    // Save changes
    await page.locator('#saveUCBtn').click();
    
    // Modal should close
    await expect(page.locator('#ucEditModal')).not.toBeVisible();
    
    // UC display should update
    await expect(page.locator('#ucValue')).toContainText('25 USD');
    
    // Icon should change color to indicate custom value
    const iconColor = await page.locator('#ucEditIcon').evaluate(el => 
      window.getComputedStyle(el).color
    );
    expect(iconColor).not.toBe('rgb(102, 102, 102)'); // Should not be default gray
  });

  test('should save monthly UC values correctly', async ({ page }) => {
    // Open modal
    await page.locator('#ucEditIcon').click();
    
    // Set custom UC value
    await page.locator('#customUCInput').fill('25.00');
    
    // Set monthly values
    await page.locator('#month2Input').fill('26.00');
    await page.locator('#month3Input').fill('27.00');
    await page.locator('#month4Input').fill('28.00');
    await page.locator('#month5Input').fill('29.00');
    
    // Save changes
    await page.locator('#saveUCBtn').click();
    
    // Modal should close
    await expect(page.locator('#ucEditModal')).not.toBeVisible();
    
    // Reopen modal to verify values were saved
    await page.locator('#ucEditIcon').click();
    
    await expect(page.locator('#customUCInput')).toHaveValue('25.00');
    await expect(page.locator('#month2Input')).toHaveValue('26.00');
    await expect(page.locator('#month3Input')).toHaveValue('27.00');
    await expect(page.locator('#month4Input')).toHaveValue('28.00');
    await expect(page.locator('#month5Input')).toHaveValue('29.00');
  });

  test('should reset UC values to defaults', async ({ page }) => {
    // First set custom values
    await page.locator('#ucEditIcon').click();
    await page.locator('#customUCInput').fill('25.50');
    await page.locator('#month2Input').fill('26.00');
    await page.locator('#saveUCBtn').click();
    
    // Verify custom values are set
    await expect(page.locator('#ucValue')).toContainText('25 USD');
    
    // Reset to defaults
    await page.locator('#ucEditIcon').click();
    await page.locator('#resetUCBtn').click();
    
    // Modal should close
    await expect(page.locator('#ucEditModal')).not.toBeVisible();
    
    // UC should return to default value
    await expect(page.locator('#ucValue')).toContainText('17 USD');
    
    // Icon should return to default color
    const iconColor = await page.locator('#ucEditIcon').evaluate(el => 
      window.getComputedStyle(el).color
    );
    expect(iconColor).toBe('rgb(102, 102, 102)'); // Should be default gray
  });

  test('should validate UC input values', async ({ page }) => {
    await page.locator('#ucEditIcon').click();
    
    // Test invalid values
    await page.locator('#customUCInput').fill('-5');
    await page.locator('#saveUCBtn').click();
    
    // Should not accept negative values (HTML5 validation)
    const value = await page.locator('#customUCInput').inputValue();
    expect(parseFloat(value)).toBeGreaterThanOrEqual(0);
    
    // Test extremely high values
    await page.locator('#customUCInput').fill('10000');
    await page.locator('#saveUCBtn').click();
    
    // Should handle or warn about extreme values
    // The app should either accept it or show a warning
  });

  test('should persist custom values across page reloads', async ({ page }) => {
    // Set custom UC value
    await page.locator('#ucEditIcon').click();
    await page.locator('#customUCInput').fill('30.00');
    await page.locator('#saveUCBtn').click();
    
    // Verify custom value is displayed
    await expect(page.locator('#ucValue')).toContainText('30 USD');
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Custom value should still be displayed
    await expect(page.locator('#ucValue')).toContainText('30 USD');
    
    // Icon should still indicate custom value
    const iconColor = await page.locator('#ucEditIcon').evaluate(el => 
      window.getComputedStyle(el).color
    );
    expect(iconColor).not.toBe('rgb(102, 102, 102)');
  });

  test('should work correctly on mobile devices', async ({ page }) => {
    // This test will run on mobile viewports as configured in playwright.config.js
    
    // Check if elements are still accessible on mobile
    await expect(page.locator('#ucEditIcon')).toBeVisible();
    
    // Open modal on mobile
    await page.locator('#ucEditIcon').click();
    await expect(page.locator('#ucEditModal')).toBeVisible();
    
    // Check modal is properly sized for mobile
    const modalWidth = await page.locator('.modal-content').evaluate(el => 
      el.offsetWidth
    );
    const viewportWidth = page.viewportSize()?.width || 0;
    
    // Modal should not exceed viewport width
    expect(modalWidth).toBeLessThanOrEqual(viewportWidth);
    
    // Input should be properly sized
    await page.locator('#customUCInput').fill('25.00');
    await expect(page.locator('#customUCInput')).toHaveValue('25.00');
    
    // Save should work on mobile
    await page.locator('#saveUCBtn').click();
    await expect(page.locator('#ucEditModal')).not.toBeVisible();
  });

  test('should handle keyboard navigation correctly', async ({ page }) => {
    await page.locator('#ucEditIcon').click();
    
    // Tab through inputs
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Enter value with keyboard
    await page.keyboard.type('25.50');
    
    // Save with Enter key
    await page.keyboard.press('Enter');
    
    // Modal should close and value should be saved
    await expect(page.locator('#ucEditModal')).not.toBeVisible();
    await expect(page.locator('#ucValue')).toContainText('25 USD');
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate offline condition
    await page.context().setOffline(true);
    
    // UC editing should still work (localStorage based)
    await page.locator('#ucEditIcon').click();
    await page.locator('#customUCInput').fill('25.00');
    await page.locator('#saveUCBtn').click();
    
    await expect(page.locator('#ucEditModal')).not.toBeVisible();
    await expect(page.locator('#ucValue')).toContainText('25 USD');
    
    // Restore online condition
    await page.context().setOffline(false);
  });
});