import { test, expect } from '@playwright/test';
import { apiRequest } from '../utils/helpers';

test.describe('GET /catalogue', () => {

  test('returns 200 OK', async ({ request }) => {
    const response = await apiRequest(request, 'GET', '/catalogue');
    expect(response.status()).toBe(200);
  });

  test('returns an array of items', async ({ request }) => {
    const response = await apiRequest(request, 'GET', '/catalogue');
    const data = await response.json();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test('response contains expected fields', async ({ request }) => {
    const response = await apiRequest(request, 'GET', '/catalogue');
    const data = await response.json();

    const item = data[0];

    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('price');
  });

});
