import { Page, expect, Route, Request } from '@playwright/test';

export async function navigateTo(page: Page, linkName: string, expectedText: string) {
  await page.getByRole('navigation').getByRole('link', { name: linkName, exact: true }).click();
  
  await expect((page.getByText(expectedText))).toBeVisible();
}

// TODO: update this function to be more flexible and reusable for other API endpoints and data structures, if needed in the future
export async function mockInventory(page: Page, items: Array<{
  id: string;
  itemId: string;
  itemName: string;
  itemPrice: string;
  quantity: string;
}>) {
  await page.route('**/purchases', async (route: Route) => {
    const req: Request = route.request();

    if (req.method() === 'GET') {
      console.log('🔥 Intercepted GET:', req.url());

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(items)
      });
      return;
    }

    route.continue();
  });
}



