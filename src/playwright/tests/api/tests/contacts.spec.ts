import { test, expect } from '@playwright/test';
import { apiRequest } from '../utils/helpers';

test.describe('POST /contacts', () => {

  test('creates a new contact and returns expected data', async ({ request }) => {
    const payload = {
      firstName: "Steven",
      lastName: "Gerrard",
      address1: "123 Street",
      address2: "Flat 4",
      address3: "Liverpool",
      address4: "Merseyside",
      pet: "Cat",
      agree: true
    };

    const response = await apiRequest(request, 'POST', '/contacts', payload);

    // Check status code
    expect(response.status()).toBe(201);

    const data = await response.json();

    // Check returned fields
    expect(data).toMatchObject({
      firstName: payload.firstName,
      lastName: payload.lastName,
      address1: payload.address1,
      address2: payload.address2,
      address3: payload.address3,
      address4: payload.address4,
      pet: payload.pet,
      agree: payload.agree
    });

    // Check response includes an ID
    expect(data).toHaveProperty('id');
  });

});

test.describe('GET /contacts', () => {

  test('returns 200 OK', async ({ request }) => {
    const response = await apiRequest(request, 'GET', '/contacts');
    expect(response.status()).toBe(200);
  });

  test('returns an array of items', async ({ request }) => {
    const response = await apiRequest(request, 'GET', '/contacts');
    const data = await response.json();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test('response contains expected fields', async ({ request }) => {
    const response = await apiRequest(request, 'GET', '/contacts');
    const data = await response.json();

    const item = data[0];

    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('firstName');
    expect(item).toHaveProperty('lastName');
    expect(item).toHaveProperty('address1');
    expect(item).toHaveProperty('address2');
    expect(item).toHaveProperty('address3');
    expect(item).toHaveProperty('address4');
    expect(item).toHaveProperty('pet');
    expect(item).toHaveProperty('agree');
  });

});