import { APIRequestContext } from '@playwright/test';

export async function apiRequest(
  request: APIRequestContext,
  method: string,
  path: string,
  data?: any
) {
  const url = `http://localhost:3030${path}`;

  const options: any = {};

  if (data) {
    options.data = data;
  }

  const response = await request.fetch(url, {
    method,
    ...options
  });

  return response;
}
