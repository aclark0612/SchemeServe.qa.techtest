import { test, expect } from '@playwright/test';
import { CataloguePage } from '../pages/CataloguePage';
import { InventoryPage } from '../pages/InventoryPage';
import { navigateTo, mockInventory } from '../utils/helpers';
import { appUrl } from '../utils/env-vars';

test('Purchase an item and verify inventory updates', async ({ page }) => {
  const itemName = 'Milk Frother';
  const itemCost = '(£25.00)';
  const dropdownName = itemName + ' ' + itemCost;

  // Navigate to the application
  await page.goto(appUrl);

  const catalogue = new CataloguePage(page);
  const inventory = new InventoryPage(page);

  // Go to the Catalogue page and select an item to purchase
  await navigateTo(page, 'Catalogue', catalogue.dropdownText);
  await catalogue.selectItem(dropdownName, itemName);

  // Click the button to purchase that item, enter a quantity and submit the purchase
  await catalogue.purchaseButton(itemName).click();

  await catalogue.enterQuantity(3);
  await catalogue.submit(itemName);

  // Navigate to the Inventory page and check that the item purchased is displayed on this page
  await navigateTo(page, 'Inventory', 'Inventory purchased');

  await expect(inventory.itemRow(itemName)).toContainText(/3/i);

  // On the Inventory page, check that all the other items, that have not been purchased, state that they have not been purchased
  const buttonTexts = await page.locator('button').allInnerTexts();
  const otherButtonTexts = buttonTexts.filter((text) => !text.includes(itemName));

  for (const text of otherButtonTexts) {
    expect(text.toLowerCase()).toContain('not purchased');
  }
});

test('Remove quantity from purchased item and verify inventory', async ({ page }) => {
  const itemName = 'Milk Frother';  

  // Pre-requisite: Have an item purchased
  mockInventory(page, [
    {
      id: '7e64',
      itemId: '6',
      itemName,
      itemPrice: '£25.00',
      quantity: '3'
    }
  ]);
  
  // Navigate to the application
  await page.goto(appUrl);

  const inventory = new InventoryPage(page);

  // Navigate to the Inventory page
  await navigateTo(page, 'Inventory', 'Inventory purchased');

  // Select the item previously purchased
  await inventory.openItem(itemName);

  // Remove a certain quantity for that item
  mockInventory(page, [
    {
      id: '7e64',
      itemId: '6',
      itemName,
      itemPrice: '£25.00',
      quantity: '1'
    }
  ]);
  await page.getByRole('spinbutton').fill('2');
  await page.getByRole('button', { name: 'Remove' }).click();

  // Verify that the Inventory page reflects that quantity change
  await expect(inventory.itemRow(itemName)).toContainText(`1 ${itemName}`, {timeout: 10000});
}
);

test('Purchase multiple items and verify inventory', async ({ page }) => {
  const itemNames = ['Milk Frother', 'Coffee Syrup', 'Coffee Filters'];  

  // Pre-requisite: Have an item purchased
  mockInventory(page, [
    {
      id: '4e79',
      itemId: '2',
      itemName: 'Coffee Syrup',
      itemPrice: '£5.00',
      quantity: '1'
     },
    {
      id: '7e64',
      itemId: '6',
      itemName: 'Milk Frother',
      itemPrice: '£25.00',
      quantity: '1'
    },
    {
      id: '8f75',
      itemId: '7',  
      itemName: 'Coffee Filters',
      itemPrice: '£2.50',
      quantity: '1'
    }
  ]);
  
  // Navigate to the application
  await page.goto(appUrl);

  const inventory = new InventoryPage(page);

  // Navigate to the Inventory page
  await navigateTo(page, 'Inventory', 'Inventory purchased');

  // Verify all of the items purchased are displayed on this page
  for (const itemName of itemNames) {
    await expect(inventory.itemRow(itemName)).toContainText(`${itemName} purchased`);
  }

  const buttonTexts = await page.locator('button').allInnerTexts();
  const otherButtonTexts = buttonTexts.filter((text) => !itemNames.some((name) => text.includes(name)));

  for (const text of otherButtonTexts) {
    expect(text.toLowerCase()).toContain('not purchased');
  }
});