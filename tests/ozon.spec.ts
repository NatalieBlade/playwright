// @ts-check
import { test, expect } from '@playwright/test';

test('Go to travel', async ({ page }) => {
    await page.goto('https://www.ozon.ru/');
    await page.getByText('Билеты, отели, туры').click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('https://www.ozon.ru/travel');
});

test('Go to tours', async ({ page }) => {
    await page.goto('/travel/');
    await page.getByRole('button', { name: 'Туры' }).click();
    expect(page.url()).toContain('https://www.ozon.ru/travel/tours');
});

test('Check tours page heading', async ({ page }) => {
  await page.goto('/travel/tours/');
  await expect(page.getByRole('heading', { name: 'Поиск туров' })).toBeVisible();
});

test('Open tourists modal and decrease adults', async ({ page }) => {
    await page.goto('/travel/tours/');
    await page.locator('[data-widget="searchForm"]').locator('label').nth(4).locator('../..').click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-popper-placement="bottom-start"]')).toBeVisible();
    await page.locator('[data-popper-placement="bottom-start"]').getByRole('button').first().click();
    const inputValue = await page.locator('[data-widget="searchForm"]').locator('label').nth(4).locator('input').inputValue();
    await expect(inputValue).toContain('1 турист');
});

test('Open calendar modal and apply day-round toggle', async ({ page }) => {
    await page.goto('/travel/tours/');
    await page.locator('[data-widget="searchForm"]').locator('label').nth(2).locator('../..').click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-popper-placement="bottom-start"]')).toBeVisible();
    await page.locator('[data-popper-placement="bottom-start"]').locator('label').first().locator('div').click();
    await expect(page.locator('[data-widget="searchForm"]').locator('label').nth(2).locator('div').nth(3)).toHaveAttribute('data-day-round', '±2');
});
