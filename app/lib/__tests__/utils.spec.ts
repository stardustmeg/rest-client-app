import { describe, expect, it, vi } from 'vitest';
import {
  decodeBase64,
  decodeRequestUrl,
  encodeBase64,
  formatJson,
  getUniqueRequestHeaders,
  headersToSearchParams,
  isString,
  methodHasBody,
  normalizeError,
  searchParamsToHeaders,
} from '../utils';

describe(formatJson.name, () => {
  it('formats valid JSON string with indentation', () => {
    const input = '{"foo": "bar", "baz": 1}';
    const onError = vi.fn();

    const result = formatJson(input, onError);

    expect(result).toBe(JSON.stringify(JSON.parse(input), null, 4));
    expect(onError).not.toHaveBeenCalled();
  });

  it('returns formatted object when input is object', () => {
    const input = { foo: 'bar', baz: 1 };
    const onError = vi.fn();

    const result = formatJson(input, onError);

    expect(result).toBe(JSON.stringify(input, null, 4));
    expect(onError).not.toHaveBeenCalled();
  });

  it('calls onError and returns raw stringified value when input is invalid JSON string', () => {
    const input = '{ invalid json }';
    const onError = vi.fn();

    const result = formatJson(input, onError);

    expect(onError).toHaveBeenCalled();
    expect(result).toBe(JSON.stringify(input));
  });

  it('handles null input', () => {
    const onError = vi.fn();

    const result = formatJson(null, onError);

    expect(result).toBe('null');
    expect(onError).not.toHaveBeenCalled();
  });

  it('handles number input', () => {
    const n = 42;
    const onError = vi.fn();

    const result = formatJson(n, onError);

    expect(result).toBe('42');
    expect(onError).not.toHaveBeenCalled();
  });

  it('handles boolean input', () => {
    const onError = vi.fn();

    const result = formatJson(true, onError);

    expect(result).toBe('true');
    expect(onError).not.toHaveBeenCalled();
  });
});

describe(isString.name, () => {
  it('returns true for primitive string', () => {
    expect(isString('hello')).toBe(true);
  });

  it('returns true for String object', () => {
    expect(isString(new String('hello'))).toBe(true);
  });

  it('returns false for number', () => {
    const n = 123;

    expect(isString(n)).toBe(false);
  });

  it('returns false for boolean', () => {
    expect(isString(true)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isString(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isString(undefined)).toBe(false);
  });

  it('returns false for object', () => {
    expect(isString({})).toBe(false);
  });

  it('returns false for array', () => {
    expect(isString(['a', 'b'])).toBe(false);
  });
});

describe(normalizeError.name, () => {
  it('returns the same error if input is already an Error', () => {
    const err = new Error('existing error');
    const result = normalizeError(err);
    expect(result).toBe(err);
  });

  it('wraps a string into Error with same message', () => {
    const result = normalizeError('custom error message');
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('custom error message');
  });

  it("returns 'Unknown error' for non-string and non-Error values", () => {
    const n = 213;
    expect(normalizeError(n).message).toBe('Unknown error');
    expect(normalizeError(null).message).toBe('Unknown error');
    expect(normalizeError(undefined).message).toBe('Unknown error');
    expect(normalizeError({}).message).toBe('Unknown error');
  });
});

describe(getUniqueRequestHeaders.name, () => {
  it('returns object with unique lowercased keys', () => {
    const result = getUniqueRequestHeaders([
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer token' },
    ]);

    expect(result).toEqual({
      'content-type': 'application/json',
      authorization: 'Bearer token',
    });
  });

  it('keeps only the first occurrence of a duplicate key', () => {
    const result = getUniqueRequestHeaders([
      { key: 'Accept', value: 'application/json' },
      { key: 'ACCEPT', value: 'text/html' },
    ]);

    expect(result).toEqual({
      accept: 'application/json',
    });
  });

  it('trims keys and values before processing', () => {
    const result = getUniqueRequestHeaders([{ key: '  X-Test  ', value: '  value ' }]);

    expect(result).toEqual({
      'x-test': 'value',
    });
  });

  it('ignores entries with empty key or value', () => {
    const result = getUniqueRequestHeaders([
      { key: '', value: 'foo' },
      { key: 'Valid', value: '' },
    ]);

    expect(result).toEqual({});
  });
});

describe(headersToSearchParams.name, () => {
  it('converts key-value pairs to URLSearchParams', () => {
    const sp = headersToSearchParams([
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer token' },
    ]);

    expect(sp.get('content-type')).toBe('application/json');
    expect(sp.get('authorization')).toBe('Bearer token');
  });

  it('trims keys and values before appending', () => {
    const sp = headersToSearchParams([{ key: '  X-Test  ', value: '  value ' }]);

    expect(sp.get('x-test')).toBe('value');
  });

  it('ignores empty keys or values', () => {
    const sp = headersToSearchParams([
      { key: '', value: 'foo' },
      { key: 'Valid', value: '' },
    ]);

    expect(Array.from(sp.entries())).toEqual([]);
  });

  it('allows duplicate keys and keeps all values', () => {
    const sp = headersToSearchParams([
      { key: 'X-Dup', value: 'one' },
      { key: 'x-dup', value: 'two' },
    ]);

    expect(sp.getAll('x-dup')).toEqual(['one', 'two']);
  });
});

describe(searchParamsToHeaders.name, () => {
  it('returns empty array if params is empty', () => {
    const params = new URLSearchParams();
    const result = searchParamsToHeaders(params);
    expect(result).toEqual([]);
  });

  it('converts params to KeyValue array and adds empty pair at the end', () => {
    const params = new URLSearchParams();
    params.append('content-type', 'application/json');
    params.append('authorization', 'Bearer token');

    const result = searchParamsToHeaders(params);

    expect(result).toEqual([
      { key: 'content-type', value: 'application/json' },
      { key: 'authorization', value: 'Bearer token' },
      { key: '', value: '' },
    ]);
  });

  it('handles duplicate keys', () => {
    const params = new URLSearchParams();
    params.append('x-dup', 'one');
    params.append('x-dup', 'two');

    const result = searchParamsToHeaders(params);

    expect(result).toEqual([
      { key: 'x-dup', value: 'one' },
      { key: 'x-dup', value: 'two' },
      { key: '', value: '' },
    ]);
  });
});

describe(encodeBase64.name, () => {
  it('encodes a simple ASCII string', () => {
    const onError = vi.fn();
    const result = encodeBase64('hello', onError);

    expect(result).toBe(btoa(encodeURIComponent('hello')));
    expect(onError).not.toHaveBeenCalled();
  });

  it('returns correct encoding for empty string', () => {
    const onError = vi.fn();
    const result = encodeBase64('', onError);

    expect(result).toBe(btoa(encodeURIComponent('')));
    expect(onError).not.toHaveBeenCalled();
  });

  it('encodes Unicode characters correctly', () => {
    const onError = vi.fn();
    const input = '✓ check';
    const result = encodeBase64(input, onError);

    expect(result).toBe(btoa(encodeURIComponent(input)));
    expect(onError).not.toHaveBeenCalled();
  });

  it('calls onError and returns original string if btoa throws', () => {
    const onError = vi.fn();
    const originalBtoa = globalThis.btoa;

    globalThis.btoa = () => {
      throw new Error('mock error');
    };

    const result = encodeBase64('fail', onError);
    expect(onError).toHaveBeenCalled();
    expect(result).toBe('fail');

    globalThis.btoa = originalBtoa;
  });
});

describe(decodeBase64.name, () => {
  it('decodes a valid Base64 string (paired with encodeBase64)', () => {
    const onError = vi.fn();
    const original = 'Hello ✓';
    const encoded = encodeBase64(original, onError);
    const decoded = decodeBase64(encoded, onError);

    expect(decoded).toBe(original);
    expect(onError).not.toHaveBeenCalled();
  });

  it('returns empty string when input is empty', () => {
    const onError = vi.fn();
    const result = decodeBase64('', onError);
    expect(result).toBe('');
    expect(onError).not.toHaveBeenCalled();
  });

  it('calls onError and returns original string when input is not valid Base64', () => {
    const onError = vi.fn();
    const input = '!!!not-base64!!!';

    const result = decodeBase64(input, onError);

    expect(onError).toHaveBeenCalled();
    expect(result).toBe(input);
  });

  it('calls onError if atob throws', () => {
    const onError = vi.fn();
    const originalAtob = globalThis.atob;

    globalThis.atob = () => {
      throw new Error('mock error');
    };

    const result = decodeBase64('aGVsbG8=', onError);

    expect(onError).toHaveBeenCalled();
    expect(result).toBe('aGVsbG8=');

    globalThis.atob = originalAtob;
  });
});

describe(decodeRequestUrl.name, () => {
  it('returns null if path is undefined', () => {
    const onError = vi.fn();
    const result = decodeRequestUrl(undefined, new URLSearchParams(), onError);
    expect(result).toBeNull();
    expect(onError).not.toHaveBeenCalled();
  });

  it('decodes valid path and searchParams', () => {
    const onError = vi.fn();
    const method = 'POST';
    const bodyType = 'json';
    const endpoint = '/api/users';
    const body = JSON.stringify({ name: 'John' });

    const encodedEndpoint = encodeBase64(endpoint, onError);
    const encodedBody = encodeBase64(body, onError);

    const sp = new URLSearchParams({ 'content-type': 'application/json' });

    const result = decodeRequestUrl([method, bodyType, encodedEndpoint, encodedBody], sp, onError);

    expect(result).toEqual({
      method,
      endpoint,
      body: {
        value: body,
        type: bodyType,
      },
      headers: searchParamsToHeaders(sp),
    });
    expect(onError).not.toHaveBeenCalled();
  });

  it('uses empty string when body is missing', () => {
    const onError = vi.fn();
    const endpoint = '/test';
    const encodedEndpoint = encodeBase64(endpoint, onError);

    const result = decodeRequestUrl(
      ['GET', 'text', encodedEndpoint],
      new URLSearchParams(),
      onError,
    );

    expect(result?.body.value).toBe('');
    expect(result?.body.type).toBe('text');
  });

  it('calls onError and falls back to original value if endpoint is invalid base64', () => {
    const onError = vi.fn();
    const invalidEndpoint = '!!!invalid-base64!!!';

    const result = decodeRequestUrl(
      ['GET', 'text', invalidEndpoint],
      new URLSearchParams(),
      onError,
    );

    expect(result?.endpoint).toBe(invalidEndpoint);
    expect(onError).toHaveBeenCalled();
  });

  it('calls onError and falls back to original body if body is invalid base64', () => {
    const onError = vi.fn();
    const endpoint = encodeBase64('/api', onError);
    const invalidBody = '%%%';

    const result = decodeRequestUrl(
      ['POST', 'json', endpoint, invalidBody],
      new URLSearchParams(),
      onError,
    );

    expect(result?.body.value).toBe(invalidBody);
    expect(onError).toHaveBeenCalled();
  });
});

describe(methodHasBody.name, () => {
  it('returns true for methods that support body', () => {
    expect(methodHasBody('POST')).toBe(true);
    expect(methodHasBody('PUT')).toBe(true);
    expect(methodHasBody('PATCH')).toBe(true);
  });

  it('returns false for methods that do not support body', () => {
    expect(methodHasBody('GET')).toBe(false);
    expect(methodHasBody('HEAD')).toBe(false);
  });

  it('returns false for completely unknown methods', () => {
    expect(methodHasBody('FOO')).toBe(false);
  });
});
