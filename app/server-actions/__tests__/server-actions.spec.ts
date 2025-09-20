import { beforeAll, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import type { RestFormData } from '@/app/domains/rest-client/components/RestForm';
import type { Id } from '@/convex/_generated/dataModel';
import {
  generateCodeSnippet,
  getLanguageList,
  getUserHistory,
  sendRequest,
} from '../server-actions';
import type { GenerateCodeSnippetParams } from '../types';

let mockFetchMutation: Mock;
let mockFetchQuery: Mock;
let mockConvexAuthNextjsToken: Mock;
let mockConvert: Mock;
let mockProxySendRequest: Mock;

vi.mock('convex/nextjs', () => ({
  fetchMutation: (...args: unknown[]) => mockFetchMutation(...args),
  fetchQuery: (...args: unknown[]) => mockFetchQuery(...args),
}));

vi.mock('@convex-dev/auth/nextjs/server', () => ({
  convexAuthNextjsToken: (...args: unknown[]) => mockConvexAuthNextjsToken(...args),
}));

vi.mock('postman-code-generators', () => ({
  default: {
    getLanguageList: vi.fn(() => ['javascript', 'python', 'curl']),
    convert: (...args: unknown[]) => mockConvert(...args),
  },
  getLanguageList: vi.fn(() => ['javascript', 'python', 'curl']),
  convert: (...args: unknown[]) => mockConvert(...args),
}));

vi.mock('postman-collection', () => ({
  default: {
    Request: vi.fn(),
    RequestBody: vi.fn(),
  },
  Request: vi.fn(),
  RequestBody: vi.fn(),
}));

vi.mock('../helpers', () => ({
  proxySendRequest: (...args: unknown[]) => mockProxySendRequest(...args),
}));

vi.mock('../../lib/utils', () => ({
  formatJson: vi.fn(() => 'formatted json'),
}));

beforeAll(() => {
  mockFetchMutation = vi.fn();
  mockFetchQuery = vi.fn();
  mockConvexAuthNextjsToken = vi.fn();
  mockConvert = vi.fn();
  mockProxySendRequest = vi.fn();
});

describe(getLanguageList.name, () => {
  it('returns the language list from postman-code-generators', async () => {
    const result = await getLanguageList();

    expect(result).toEqual(['javascript', 'python', 'curl']);
  });
});

describe(generateCodeSnippet.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('generates code snippet successfully', async () => {
    mockConvert.mockImplementationOnce((_lang, _variant, _request, _options, callback) => {
      callback(null, 'generated code');
    });

    const params = {
      method: 'GET',
      endpoint: 'https://api.example.com/users',
      headers: [{ key: 'Authorization', value: 'Bearer token' }],
      body: { type: 'json', value: '{"query": "test"}' },
      language: 'javascript',
      variant: 'fetch',
    };

    const result = await generateCodeSnippet(params as GenerateCodeSnippetParams);

    expect(result).toBe('generated code');
    expect(mockConvert).toHaveBeenCalledWith(
      'javascript',
      'fetch',
      expect.any(Object),
      {},
      expect.any(Function),
    );
  });

  it('throws error when code generation fails', async () => {
    mockConvert.mockImplementationOnce((_lang, _variant, _request, _options, callback) => {
      callback(new Error('Generation failed'), null);
    });

    const params = {
      method: 'POST',
      endpoint: '/api/test',
      headers: [],
      body: { type: 'json', value: '' },
      language: 'python',
      variant: 'requests',
    };

    await expect(generateCodeSnippet(params as GenerateCodeSnippetParams)).rejects.toThrow(
      'Generation failed',
    );
  });
});

describe(sendRequest.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends request and saves history successfully', async () => {
    const mockResponse = {
      responseBody: { value: '{"success": true}' },
      statusCode: 200,
      responseSize: '1.2 KB',
      requestDuration: '150ms',
    };

    mockProxySendRequest.mockResolvedValue(mockResponse);
    mockFetchMutation.mockResolvedValue({});

    const formData = {
      method: 'GET',
      endpoint: '/api/test',
      headers: [],
      body: { type: 'json', value: '' },
    };

    const onError = vi.fn();
    const result = await sendRequest(formData as RestFormData, 'user-123' as Id<'users'>, onError);

    expect(mockProxySendRequest).toHaveBeenCalledWith(formData);
    expect(mockFetchMutation).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        userId: 'user-123',
        requestBody: { type: 'json', value: '' },
      }),
    );
    expect(result.responseBody).toBe('formatted json');
    expect(onError).not.toHaveBeenCalled();
  });

  it('handles proxy request errors', async () => {
    mockProxySendRequest.mockRejectedValue(new Error('Network error'));

    const formData = {
      method: 'GET',
      endpoint: '/api/test',
      headers: [],
      body: { type: 'json', value: '' },
    };

    const onError = vi.fn();

    await expect(
      sendRequest(formData as RestFormData, 'user-123' as Id<'users'>, onError),
    ).rejects.toThrow('Network error');
  });

  it('handles history save errors gracefully', async () => {
    const mockResponse = {
      responseBody: { value: '{"success": true}' },
      statusCode: 200,
      responseSize: '1.2 KB',
      requestDuration: '150ms',
    };

    mockProxySendRequest.mockResolvedValue(mockResponse);
    mockFetchMutation.mockRejectedValue(new Error('History save failed'));

    const formData = {
      method: 'GET',
      endpoint: '/api/test',
      headers: [],
      body: { type: 'json', value: '' },
    };

    const onError = vi.fn();

    const result = await sendRequest(formData as RestFormData, 'user-123' as Id<'users'>, onError);

    expect(result.responseBody).toBe('formatted json');
    expect(mockFetchMutation).toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(new Error('History save failed'));
  });
});

describe(getUserHistory.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns user history when token is available', async () => {
    const mockToken = 'valid-token';
    const mockHistoryData = [{ id: '1', method: 'GET', endpoint: '/api/test' }];
    const mockUserData = { id: 'user-123', name: 'Test User' };

    mockConvexAuthNextjsToken.mockResolvedValue(mockToken);
    mockFetchQuery.mockResolvedValueOnce(mockHistoryData);
    mockFetchQuery.mockResolvedValueOnce(mockUserData);

    const result = await getUserHistory();

    expect(result).toEqual({
      data: mockHistoryData,
      user: mockUserData,
    });
    expect(mockFetchQuery).toHaveBeenCalledTimes(2);
  });

  it('returns empty data when no token available', async () => {
    mockConvexAuthNextjsToken.mockResolvedValue(null);

    const result = await getUserHistory();

    expect(result).toEqual({
      data: [],
      user: null,
    });
    expect(mockFetchQuery).not.toHaveBeenCalled();
  });

  it('returns empty data when queries fail', async () => {
    mockConvexAuthNextjsToken.mockResolvedValue('token');
    mockFetchQuery.mockRejectedValue(new Error('Query failed'));

    const result = await getUserHistory();

    expect(result).toEqual({
      data: [],
      user: null,
    });
  });
});
