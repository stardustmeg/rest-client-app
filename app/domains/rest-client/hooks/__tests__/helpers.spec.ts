import { describe, expect, it } from 'vitest';
import { extractFormData } from '../helpers';

describe(extractFormData.name, () => {
  it('extracts basic form data with method and endpoint', () => {
    const formData = new FormData();
    formData.append('method', 'GET');
    formData.append('endpoint', 'https://api.example.com/users');

    const result = extractFormData(formData);

    expect(result).toEqual({
      method: 'GET',
      endpoint: 'https://api.example.com/users',
      headers: [],
      body: { type: 'json', value: '' },
    });
  });

  it('extracts headers from form data', () => {
    const formData = new FormData();
    formData.append('method', 'POST');
    formData.append('endpoint', '/api/test');
    formData.append('header-key-0', 'Content-Type');
    formData.append('header-value-0', 'application/json');
    formData.append('header-key-1', 'Authorization');
    formData.append('header-value-1', 'Bearer token');

    const result = extractFormData(formData);

    expect(result).toEqual({
      method: 'POST',
      endpoint: '/api/test',
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Authorization', value: 'Bearer token' },
      ],
      body: { type: 'json', value: '' },
    });
  });

  it('extracts body data when present', () => {
    const formData = new FormData();
    formData.append('method', 'POST');
    formData.append('endpoint', '/api/users');
    formData.append('bodyType', 'json');
    formData.append('bodyValue', '{"name": "John"}');

    const result = extractFormData(formData);

    expect(result).toEqual({
      method: 'POST',
      endpoint: '/api/users',
      headers: [],
      body: { type: 'json', value: '{"name": "John"}' },
    });
  });

  it('handles text body type', () => {
    const formData = new FormData();
    formData.append('method', 'PUT');
    formData.append('endpoint', '/api/data');
    formData.append('bodyType', 'text');
    formData.append('bodyValue', 'plain text content');

    const result = extractFormData(formData);

    expect(result.body).toEqual({ type: 'text', value: 'plain text content' });
  });

  it('defaults to json type when bodyType is empty', () => {
    const formData = new FormData();
    formData.append('method', 'POST');
    formData.append('endpoint', '/api/test');
    formData.append('bodyType', '');
    formData.append('bodyValue', 'some content');

    const result = extractFormData(formData);

    expect(result.body).toEqual({ type: 'json', value: '' });
  });

  it('ignores headers with missing keys', () => {
    const formData = new FormData();
    formData.append('method', 'GET');
    formData.append('endpoint', '/test');
    formData.append('header-value-0', 'some-value');

    const result = extractFormData(formData);

    expect(result.headers).toEqual([]);
  });

  it('ignores headers with empty keys', () => {
    const formData = new FormData();
    formData.append('method', 'GET');
    formData.append('endpoint', '/test');
    formData.append('header-key-0', '');
    formData.append('header-value-0', 'some-value');

    const result = extractFormData(formData);

    expect(result.headers).toEqual([]);
  });

  it('handles partial header data gracefully', () => {
    const formData = new FormData();
    formData.append('method', 'GET');
    formData.append('endpoint', '/test');
    formData.append('header-key-0', 'Valid-Key');
    formData.append('header-value-0', 'valid-value');
    formData.append('header-key-1', 'Partial-Key');

    const result = extractFormData(formData);

    expect(result.headers).toEqual([{ key: 'Valid-Key', value: 'valid-value' }]);
  });
});
