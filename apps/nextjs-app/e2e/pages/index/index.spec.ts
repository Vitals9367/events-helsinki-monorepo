import homeJsonEn from '@events-helsinki/common-i18n/locales/en/demo.json';
import homeJsonFr from '@events-helsinki/common-i18n/locales/fr/demo.json';
import { test, expect } from '@playwright/test';

test.describe('Demo page', () => {
  test('should have the title in english by default', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title).toBe(homeJsonEn.page.title);
  });
  test('should have the title in french', async ({ page }) => {
    await page.goto('/fr');
    const title = await page.title();
    expect(title).toBe(homeJsonFr.page.title);
  });
});
