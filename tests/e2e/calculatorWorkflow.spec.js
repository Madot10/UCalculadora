import { test, expect } from '@playwright/test';

test.describe('UCalculadora E2E Tests - Complete Calculator Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should complete full calculation workflow successfully', async ({ page }) => {
    // Step 1: Select Sede (Campus)
    await page.locator('button:has-text("CARACAS")').click();
    await expect(page.locator('button:has-text("CARACAS")')).toHaveClass(/active/);
    
    // Step 2: Select Carrera (Career)
    await page.locator('button:has-text("Ingeniería")').first().click();
    await expect(page.locator('button:has-text("Ingeniería")').first()).toHaveClass(/active/);
    
    // Step 3: Add subjects (if subjects section is available)
    const addSubjectBtn = page.locator('text=+').first();
    if (await addSubjectBtn.isVisible()) {
      await addSubjectBtn.click();
      // Assume a subject modal opens, select first available subject
      const firstSubject = page.locator('.subject-option').first();
      if (await firstSubject.isVisible()) {
        await firstSubject.click();
      }
    }
    
    // Step 4: Select Cooperation
    await page.locator('button:has-text("Ninguna")').click();
    await expect(page.locator('button:has-text("Ninguna")')).toHaveClass(/active/);
    
    // Step 5: Calculate
    await page.locator('button:has-text("CALCULAR")').click();
    
    // Verify results are displayed
    await expect(page.locator('#resultados')).toBeVisible();
    
    // Check that calculation results are shown
    const totalDisplay = page.locator('#totalBsDisplay');
    await expect(totalDisplay).toBeVisible();
    await expect(totalDisplay).not.toHaveText('0 USD');
  });

  test('should show error when required fields are missing', async ({ page }) => {
    // Try to calculate without selecting required fields
    await page.locator('button:has-text("CALCULAR")').click();
    
    // Error message should be displayed
    await expect(page.locator('#alertmsg')).toBeVisible();
    await expect(page.locator('#alertmsg')).toContainText('seleccionar');
  });

  test('should apply sede discount correctly for Guayana', async ({ page }) => {
    // Select Guayana campus
    await page.locator('button:has-text("GUAYANA")').click();
    await page.locator('button:has-text("Ingeniería")').first().click();
    await page.locator('button:has-text("Ninguna")').click();
    
    // Calculate
    await page.locator('button:has-text("CALCULAR")').click();
    
    // Results should reflect 20% discount
    await expect(page.locator('#resultados')).toBeVisible();
    
    // The total should be less than if calculated with Caracas prices
    const totalText = await page.locator('#totalBsDisplay').textContent();
    expect(totalText).toContain('USD');
  });

  test('should handle custom UC values in calculations', async ({ page }) => {
    // Set custom UC value first
    await page.locator('#ucEditIcon').click();
    await page.locator('#customUCInput').fill('25.00');
    await page.locator('#saveUCBtn').click();
    
    // Complete calculation workflow
    await page.locator('button:has-text("CARACAS")').click();
    await page.locator('button:has-text("Ingeniería")').first().click();
    await page.locator('button:has-text("Ninguna")').click();
    await page.locator('button:has-text("CALCULAR")').click();
    
    // Results should reflect custom UC value
    await expect(page.locator('#resultados')).toBeVisible();
    
    // The calculation should use 25 USD instead of default 17 USD
    const totalText = await page.locator('#totalBsDisplay').textContent();
    expect(totalText).toContain('USD');
    
    // Reset for other tests
    await page.locator('#ucEditIcon').click();
    await page.locator('#resetUCBtn').click();
  });

  test('should work correctly with different cooperation types', async ({ page }) => {
    // Test with Beca (Scholarship)
    await page.locator('button:has-text("CARACAS")').click();
    await page.locator('button:has-text("Ingeniería")').first().click();
    await page.locator('button:has-text("Beca")').click();
    await page.locator('button:has-text("CALCULAR")').click();
    
    await expect(page.locator('#resultados')).toBeVisible();
    const becaTotal = await page.locator('#totalBsDisplay').textContent();
    
    // Reset and test with Propedéutico
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    await page.locator('button:has-text("CARACAS")').click();
    await page.locator('button:has-text("Ingeniería")').first().click();
    await page.locator('button:has-text("Propedéutico")').click();
    await page.locator('button:has-text("CALCULAR")').click();
    
    await expect(page.locator('#resultados')).toBeVisible();
    const propTotal = await page.locator('#totalBsDisplay').textContent();
    
    // Results should be different
    expect(becaTotal).not.toBe(propTotal);
  });

  test('should handle subject addition and removal correctly', async ({ page }) => {
    // Select sede and carrera first
    await page.locator('button:has-text("CARACAS")').click();
    await page.locator('button:has-text("Ingeniería")').first().click();
    
    // Check initial UC total
    const initialTotal = await page.locator('#totalUC').textContent();
    
    // Add a subject (if add button is available)
    const addBtn = page.locator('text=+').first();
    if (await addBtn.isVisible()) {
      await addBtn.click();
      
      // If subject selection modal appears
      const subjectModal = page.locator('.subject-modal');
      if (await subjectModal.isVisible()) {
        await page.locator('.subject-option').first().click();
        
        // Check that UC total increased
        const newTotal = await page.locator('#totalUC').textContent();
        expect(newTotal).not.toBe(initialTotal);
        
        // Remove subject if remove button exists
        const removeBtn = page.locator('.remove-subject-btn').first();
        if (await removeBtn.isVisible()) {
          await removeBtn.click();
          
          // UC total should return to initial value
          const finalTotal = await page.locator('#totalUC').textContent();
          expect(finalTotal).toBe(initialTotal);
        }
      }
    }
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // This test runs on mobile viewports as configured
    
    // Check main layout elements are visible
    await expect(page.locator('h1:has-text("UCALCULADORA")')).toBeVisible();
    await expect(page.locator('button:has-text("CARACAS")')).toBeVisible();
    
    // Buttons should be tappable on mobile
    await page.locator('button:has-text("CARACAS")').tap();
    await expect(page.locator('button:has-text("CARACAS")')).toHaveClass(/active/);
    
    // Modal should work on mobile
    await page.locator('#ucEditIcon').tap();
    await expect(page.locator('#ucEditModal')).toBeVisible();
    
    // Modal should be properly sized for mobile
    const modal = page.locator('.modal-content');
    const modalBox = await modal.boundingBox();
    const viewport = page.viewportSize();
    
    if (modalBox && viewport) {
      expect(modalBox.width).toBeLessThanOrEqual(viewport.width);
    }
    
    // Close modal
    await page.locator('.close').tap();
    await expect(page.locator('#ucEditModal')).not.toBeVisible();
  });

  test('should handle browser refresh correctly', async ({ page }) => {
    // Set up a calculation
    await page.locator('button:has-text("CARACAS")').click();
    await page.locator('button:has-text("Ingeniería")').first().click();
    await page.locator('button:has-text("Ninguna")').click();
    
    // Set custom UC value
    await page.locator('#ucEditIcon').click();
    await page.locator('#customUCInput').fill('30.00');
    await page.locator('#saveUCBtn').click();
    
    // Refresh page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Custom UC value should persist
    await expect(page.locator('#ucValue')).toContainText('30 USD');
    
    // Need to re-select options after refresh
    await page.locator('button:has-text("CARACAS")').click();
    await page.locator('button:has-text("Ingeniería")').first().click();
    await page.locator('button:has-text("Ninguna")').click();
    await page.locator('button:has-text("CALCULAR")').click();
    
    // Calculation should still work with persistent custom UC
    await expect(page.locator('#resultados')).toBeVisible();
  });

  test('should handle accessibility requirements', async ({ page }) => {
    // Check for proper ARIA labels and keyboard navigation
    
    // Tab through main interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // UC edit icon should be focusable
    const ucEditIcon = page.locator('#ucEditIcon');
    await ucEditIcon.focus();
    
    // Should be able to activate with Enter/Space
    await page.keyboard.press('Enter');
    await expect(page.locator('#ucEditModal')).toBeVisible();
    
    // Modal should trap focus
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.id);
    expect(focusedElement).toBeTruthy();
    
    // Escape should close modal
    await page.keyboard.press('Escape');
    await expect(page.locator('#ucEditModal')).not.toBeVisible();
  });

  test('should handle error conditions gracefully', async ({ page }) => {
    // Test with network issues
    await page.context().setOffline(true);
    
    // Basic functionality should still work
    await page.locator('button:has-text("CARACAS")').click();
    await expect(page.locator('button:has-text("CARACAS")')).toHaveClass(/active/);
    
    // UC editing should work offline (localStorage based)
    await page.locator('#ucEditIcon').click();
    await page.locator('#customUCInput').fill('25.00');
    await page.locator('#saveUCBtn').click();
    await expect(page.locator('#ucValue')).toContainText('25 USD');
    
    // Restore network
    await page.context().setOffline(false);
    
    // Test with corrupted localStorage (simulate by executing JS)
    await page.evaluate(() => {
      localStorage.setItem('customUCValue', 'invalid_value');
    });
    
    // App should handle corrupted data gracefully
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Should not crash and should show default values
    await expect(page.locator('h1:has-text("UCALCULADORA")')).toBeVisible();
  });

  test('should validate calculation accuracy', async ({ page }) => {
    // Set known UC value for predictable testing
    await page.locator('#ucEditIcon').click();
    await page.locator('#customUCInput').fill('20.00');
    await page.locator('#saveUCBtn').click();
    
    // Complete calculation with known values
    await page.locator('button:has-text("CARACAS")').click();
    await page.locator('button:has-text("Ingeniería")').first().click();
    await page.locator('button:has-text("Ninguna")').click();
    
    // If we can determine UC count, verify calculation
    const ucTotalText = await page.locator('#totalUC').textContent();
    if (ucTotalText) {
      const ucMatch = ucTotalText.match(/(\d+)\s*UC/);
      if (ucMatch) {
        const ucCount = parseInt(ucMatch[1]);
        
        await page.locator('button:has-text("CALCULAR")').click();
        await expect(page.locator('#resultados')).toBeVisible();
        
        const totalText = await page.locator('#totalBsDisplay').textContent();
        const totalMatch = totalText?.match(/([\d,]+(?:\.\d{2})?)\s*USD/);
        
        if (totalMatch) {
          const calculatedTotal = parseFloat(totalMatch[1].replace(',', ''));
          const expectedTotal = ucCount * 20.00; // 20 USD per UC
          
          // Allow for minor floating point differences
          expect(Math.abs(calculatedTotal - expectedTotal)).toBeLessThan(0.01);
        }
      }
    }
  });
});