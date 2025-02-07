/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

test.describe('Quartile Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display the main title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Quartile Generator' }))
      .toBeVisible();
  });

  test('should add a new tile', async ({ page }) => {
    await page.getByLabel('New Tile Letters').fill('test');
    await page.getByRole('button', { name: 'Add Tile' }).click();
    await expect(page.getByText('test')).toBeVisible();
  });

  test('should analyze selected tiles', async ({ page }) => {
    await page.getByLabel('New Tile Letters').fill('in');
    await page.getByRole('button', { name: 'Add Tile' }).click();
    await page.getByLabel('New Tile Letters').fill('put');
    await page.getByRole('button', { name: 'Add Tile' }).click();

    await page.getByTestId('tile-0').click();
    await page.getByTestId('tile-1').click();

    await page.getByRole('button', { name: 'Analyze Selected Tiles' }).click();

    await expect(page.locator('#word-list').getByText('input')).toBeVisible();
  });

  test('should save and load boards', async ({ page }) => {
    // Add some tiles
    await page.getByLabel('New Tile Letters').fill('test');
    await page.getByRole('button', { name: 'Add Tile' }).click();

    // Save the board
    await page.getByRole('button', { name: 'Save Current Board' }).click();
    await page.getByLabel('Board Name').fill('My Test Board');
    await page.getByRole('button', { name: 'Save' }).click();

    // View saved boards
    await page.getByRole('button', { name: 'View Saved Boards' }).click();
    await expect(page.getByText('My Test Board')).toBeVisible();
  });

  test('should clear selected tiles', async ({ page }) => {
    // Add and select tiles
    await page.getByLabel('New Tile Letters').fill('test');
    await page.getByRole('button', { name: 'Add Tile' }).click();
    await page.getByText('test').click();

    // Clear selection
    await page.getByRole('button', { name: 'Clear Selection' }).click();

    // Verify Analyze button is disabled
    await expect(page.getByRole('button', { name: 'Analyze Selected Tiles' }))
      .toBeDisabled();
  });

  test('should handle tab switching in word list', async ({ page }) => {
    await page.getByLabel('New Tile Letters').fill('in');
    await page.getByRole('button', { name: 'Add Tile' }).click();
    await page.getByLabel('New Tile Letters').fill('put');
    await page.getByRole('button', { name: 'Add Tile' }).click();

    await page.getByTestId('tile-0').click();
    await page.getByTestId('tile-1').click();

    await page.getByRole('button', { name: 'Analyze Selected Tiles' }).click();

    await page.getByRole('tab', { name: '2 Tiles' }).click();
    await expect(page.locator('#word-list').getByText('input')).toBeVisible();
  });
});
