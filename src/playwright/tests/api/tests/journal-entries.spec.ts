import { test, expect } from '@playwright/test';
import { apiRequest } from '../utils/helpers';

test.describe('GET /journalEntries', () => {

  test('returns entries filtered by credit type', async ({ request }) => {
    const creditType = 'Cash';

    const response = await apiRequest(
      request,
      'GET',
      `/journalEntries?credit=${creditType}`
    );

    // Status code
    expect(response.status()).toBe(200);

    const data: Array<{ credit: string }> = await response.json();

    // If entries exist, validate fields
    if (data.length > 0) {
      data.forEach((entry) => {
        // Check the filter actually worked
        expect(entry.credit).toBe(creditType);
      });
    }
  });

});
