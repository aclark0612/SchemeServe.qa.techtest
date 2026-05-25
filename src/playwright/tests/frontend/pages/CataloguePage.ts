import { Page, Locator, expect } from '@playwright/test';

export class CataloguePage {
  readonly page: Page;
  readonly dropdownText: string;
  readonly purchaseButton: (itemName: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdownText = 'Select an item to purchase'; 
    this.purchaseButton = (itemName: string) =>
      page.getByRole('button', { name: `Purchase ${itemName}` });
  }

  async selectItem(dropdownName: string, itemName: string) {
    await this.page.selectOption('#catalogue-dropdown', [ dropdownName ]);

    await expect(this.page.getByRole('button', { name: `Purchase ${itemName}` })).toBeVisible();
  }

  async enterQuantity(qty: number) {
    await this.page.getByLabel(/quantity/i).fill(String(qty));
  }

  async submit(itemName: string) {
    await this.page.getByRole('button', { name: /submit/i }).click();

    await expect(this.page.getByText(`Purchase of ${itemName} successful`)).toBeVisible();

    await expect(this.page.getByRole('button', { name: /submit/i })).not.toBeVisible();
  }
}
