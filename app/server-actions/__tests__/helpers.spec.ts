import { describe, expect, it } from 'vitest';
import type { RestFormData } from '@/app/domains/rest-client/components/RestForm';
import { calculateRequestSize, proxySendRequest } from '../helpers';

describe(proxySendRequest.name, () => {
  const headers = [{ key: 'Content-Type', value: 'application/json' }];

  it('GET /posts should return list', async () => {
    const request: RestFormData = {
      method: 'GET',
      endpoint: 'https://jsonplaceholder.typicode.com/posts',
      headers,
      body: { type: 'json', value: '' },
    };

    const result = await proxySendRequest(request);

    const EXPECTED_STATUS_CODE = 200;
    expect(result.responseStatusCode).toBe(EXPECTED_STATUS_CODE);
    expect(Array.isArray(result.responseBody?.value)).toBe(true);
  });

  it('GET /posts/:id should return a single post', async () => {
    const request: RestFormData = {
      method: 'GET',
      endpoint: 'https://jsonplaceholder.typicode.com/posts/2',
      headers,
      body: { type: 'json', value: '' },
    };

    const result = await proxySendRequest(request);

    const EXPECTED_STATUS_CODE = 200;
    expect(result.responseStatusCode).toBe(EXPECTED_STATUS_CODE);
    expect(result.responseBody?.value).toMatchObject({
      id: 2,
      title: 'mocked title 2',
      body: 'mocked body for post 2',
    });
  });

  it('POST /posts should create a new post', async () => {
    const payload = { title: 'foo', userId: 1 };

    const request: RestFormData = {
      method: 'POST',
      endpoint: 'https://jsonplaceholder.typicode.com/posts',
      headers,
      body: { type: 'json', value: JSON.stringify(payload) },
    };

    const result = await proxySendRequest(request);

    const EXPECTED_STATUS_CODE = 201;
    expect(result.responseStatusCode).toBe(EXPECTED_STATUS_CODE);
    expect(result.responseBody?.value).toMatchObject({
      body: { title: 'foo', userId: 1 },
    });
  });

  it('PUT /posts/:id should update a post', async () => {
    const payload = { title: 'updated', body: 'new body', userId: 1 };

    const request: RestFormData = {
      method: 'PUT',
      endpoint: 'https://jsonplaceholder.typicode.com/posts/1',
      headers,
      body: { type: 'json', value: JSON.stringify(payload) },
    };

    const result = await proxySendRequest(request);

    const EXPECTED_STATUS_CODE = 200;
    expect(result.responseStatusCode).toBe(EXPECTED_STATUS_CODE);
    expect(result.responseBody?.value).toMatchObject({
      id: 1,
      body: payload,
    });
  });

  it('PATCH /posts/:id should partially update a post', async () => {
    const payload = { title: 'patched title' };

    const request: RestFormData = {
      method: 'PATCH',
      endpoint: 'https://jsonplaceholder.typicode.com/posts/1',
      headers,
      body: { type: 'json', value: JSON.stringify(payload) },
    };

    const result = await proxySendRequest(request);

    const EXPECTED_STATUS_CODE = 200;
    expect(result.responseStatusCode).toBe(EXPECTED_STATUS_CODE);
    expect(result.responseBody?.value).toMatchObject({
      id: 1,
      body: payload,
    });
  });

  it('DELETE /posts/:id should delete a post', async () => {
    const request: RestFormData = {
      method: 'DELETE',
      endpoint: 'https://jsonplaceholder.typicode.com/posts/1',
      headers,
      body: { type: 'json', value: '' },
    };

    const result = await proxySendRequest(request);

    const EXPECTED_STATUS_CODE = 200;
    expect(result.responseStatusCode).toBe(EXPECTED_STATUS_CODE);
    expect(result.responseBody?.value).toMatchObject({
      message: 'Post 1 deleted',
    });
  });

  it('should handle invalid URL in catch block', async () => {
    const request: RestFormData = {
      method: 'GET',
      endpoint: 'not-a-valid-url',
      headers,
      body: { type: 'json', value: '' },
    };
    const result = await proxySendRequest(request);
    expect(result.errorDetails).toBeDefined();
  });
});

describe(calculateRequestSize.name, () => {
  it('returns 0 for empty headers and body', () => {
    const result = calculateRequestSize({
      headers: [],
      body: { type: 'json', value: '' },
    } as Pick<RestFormData, 'headers' | 'body'>);

    expect(result).toBe(0);
  });

  it('calculates size for headers only', () => {
    const result = calculateRequestSize({
      headers: [{ key: 'Content-Type', value: 'application/json' }],
      body: { type: 'json', value: '' },
    } as Pick<RestFormData, 'headers' | 'body'>);

    expect(result).toBeGreaterThan(0);
  });

  it('calculates size for body only', () => {
    const result = calculateRequestSize({
      headers: [],
      body: { type: 'json', value: '{"foo":"bar"}' },
    } as Pick<RestFormData, 'headers' | 'body'>);

    expect(result).toBeGreaterThan(0);
  });

  it('calculates size for headers and body', () => {
    const result = calculateRequestSize({
      headers: [{ key: 'Authorization', value: 'Bearer token' }],
      body: { type: 'json', value: '{"foo":"bar"}' },
    } as Pick<RestFormData, 'headers' | 'body'>);

    expect(result).toBeGreaterThan(0);
  });
});
