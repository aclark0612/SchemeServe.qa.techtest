import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly itemRow: (itemName: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemRow = (itemName: string) =>
      // TODO: update this selector to be more specific and robust, e.g. by using data attributes or a more specific structure, to avoid potential issues with items having similar names or other buttons on the page
      page.getByRole('button', { name: itemName });
  }

  async openItem(itemName: string) {
    await this.itemRow(itemName).click();
  }
}
