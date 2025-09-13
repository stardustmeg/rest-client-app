import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import type { RestFormData } from '@/app/domains/rest-client/components/RestForm';
import { useResolveVariables } from '@/app/domains/variables/hooks/use-resolve-variables';
import { useToast } from '@/app/hooks/use-toast';

vi.mock('@/app/hooks/use-toast', () => ({
  useToast: vi.fn(),
}));

vi.mock('jotai', () => ({
  useAtom: vi.fn(),
}));

vi.mock('@/app/domains/variables/store/variables-store', () => ({
  variablesAtom: 'mock-atom',
  useVariablesActions: vi.fn(),
}));

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: <explanation>
describe('useResolveVariables', () => {
  const mockWarning = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useToast as Mock).mockReturnValue({
      warning: mockWarning,
    });
  });

  it('should resolve variables in URL', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([
      [
        { id: 1, name: '{{userId}}', value: '123' },
        { id: 2, name: '{{postId}}', value: '456' },
      ],
      vi.fn(),
    ]);

    const { result } = renderHook(() => useResolveVariables(), {
      wrapper: TestProviders,
    });

    const formData: RestFormData = {
      method: 'GET',
      endpoint: 'https://api.example.com/users/{{userId}}/posts/{{postId}}',
      headers: [],
      body: { type: 'json', value: '{}' },
    };

    const resolved = result.current.resolveVariables(formData);

    expect(resolved.endpoint).toBe('https://api.example.com/users/123/posts/456');
  });

  it('should resolve variables in headers', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([
      [
        { id: 1, name: '{{token}}', value: 'abc123' },
        { id: 2, name: '{{contentType}}', value: 'application/json' },
      ],
      vi.fn(),
    ]);

    const { result } = renderHook(() => useResolveVariables(), {
      wrapper: TestProviders,
    });

    const formData: RestFormData = {
      method: 'POST',
      endpoint: 'https://api.example.com/data',
      headers: [
        { key: 'Authorization', value: 'Bearer {{token}}' },
        { key: 'Content-Type', value: '{{contentType}}' },
      ],
      body: { type: 'json', value: '{}' },
    };

    const resolved = result.current.resolveVariables(formData);

    expect(resolved.headers).toEqual([
      { key: 'Authorization', value: 'Bearer abc123' },
      { key: 'Content-Type', value: 'application/json' },
    ]);
  });

  it('should resolve variables in JSON body', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([
      [
        { id: 1, name: '{{userName}}', value: 'John Doe' },
        { id: 2, name: '{{userAge}}', value: '30' },
        { id: 3, name: '{{isActive}}', value: 'true' },
      ],
      vi.fn(),
    ]);

    const { result } = renderHook(() => useResolveVariables(), {
      wrapper: TestProviders,
    });

    const formData: RestFormData = {
      method: 'POST',
      endpoint: 'https://api.example.com/users',
      headers: [],
      body: {
        type: 'json',
        value: '{"name": "{{userName}}", "age": {{userAge}}, "active": {{isActive}}}',
      },
    };

    const resolved = result.current.resolveVariables(formData);

    expect(resolved.body.value).toBe('{"name": "John Doe", "age": 30, "active": true}');
  });

  it('should resolve variables in nested JSON objects', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([
      [
        { id: 1, name: '{{userName}}', value: 'John Doe' },
        { id: 2, name: '{{userAge}}', value: '30' },
        { id: 3, name: '{{userCity}}', value: 'New York' },
        { id: 4, name: '{{theme}}', value: 'dark' },
      ],
      vi.fn(),
    ]);

    const { result } = renderHook(() => useResolveVariables(), {
      wrapper: TestProviders,
    });

    const formData: RestFormData = {
      method: 'POST',
      endpoint: 'https://api.example.com/users',
      headers: [],
      body: {
        type: 'json',
        value:
          '{"user": {"name": "{{userName}}", "profile": {"age": {{userAge}}, "city": "{{userCity}}"}}, "settings": {"theme": "{{theme}}"}}',
      },
    };

    const resolved = result.current.resolveVariables(formData);

    expect(resolved.body.value).toBe(
      '{"user": {"name": "John Doe", "profile": {"age": 30, "city": "New York"}}, "settings": {"theme": "dark"}}',
    );
  });

  it('should resolve variables in JSON arrays', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([
      [
        { id: 1, name: '{{user1}}', value: 'Alice' },
        { id: 2, name: '{{user2}}', value: 'Bob' },
        { id: 3, name: '{{user3}}', value: 'Charlie' },
        { id: 4, name: '{{userCount}}', value: '3' },
      ],
      vi.fn(),
    ]);

    const { result } = renderHook(() => useResolveVariables(), {
      wrapper: TestProviders,
    });

    const formData: RestFormData = {
      method: 'POST',
      endpoint: 'https://api.example.com/users',
      headers: [],
      body: {
        type: 'json',
        value: '{"users": ["{{user1}}", "{{user2}}", "{{user3}}"], "count": {{userCount}}}',
      },
    };

    const resolved = result.current.resolveVariables(formData);

    expect(resolved.body.value).toBe('{"users": ["Alice", "Bob", "Charlie"], "count": 3}');
  });

  it('should resolve variables in text body', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([
      [
        { id: 1, name: '{{userName}}', value: 'John' },
        { id: 2, name: '{{orderId}}', value: '12345' },
      ],
      vi.fn(),
    ]);

    const { result } = renderHook(() => useResolveVariables(), {
      wrapper: TestProviders,
    });

    const formData: RestFormData = {
      method: 'POST',
      endpoint: 'https://api.example.com/text',
      headers: [],
      body: {
        type: 'text',
        value: 'Hello {{userName}}, your order {{orderId}} is ready!',
      },
    };

    const resolved = result.current.resolveVariables(formData);

    expect(resolved.body.value).toBe('Hello John, your order 12345 is ready!');
  });

  it('should handle invalid JSON gracefully', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([
      [{ id: 1, name: '{{variable}}', value: 'resolvedValue' }],
      vi.fn(),
    ]);

    const { result } = renderHook(() => useResolveVariables(), {
      wrapper: TestProviders,
    });

    const formData: RestFormData = {
      method: 'POST',
      endpoint: 'https://api.example.com/text',
      headers: [],
      body: {
        type: 'json',
        value: 'invalid json with {{variable}}',
      },
    };

    const resolved = result.current.resolveVariables(formData);

    expect(resolved.body.value).toBe('invalid json with resolvedValue');
  });

  it('should warn about missing variables', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([
      [{ id: 1, name: '{{existingVar}}', value: 'value' }],
      vi.fn(),
    ]);

    const { result } = renderHook(() => useResolveVariables(), {
      wrapper: TestProviders,
    });

    const formData: RestFormData = {
      method: 'GET',
      endpoint: 'https://api.example.com/{{existingVar}}/{{missingVar}}',
      headers: [],
      body: { type: 'json', value: '{}' },
    };

    const resolved = result.current.resolveVariables(formData);

    expect(resolved.endpoint).toBe('https://api.example.com/value/{{missingVar}}');
    expect(mockWarning).toHaveBeenCalledWith('Variable "missingVar" is not defined');
  });

  it('should warn about missing variables in headers', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([
      [{ id: 1, name: '{{existingVar}}', value: 'value' }],
      vi.fn(),
    ]);

    const { result } = renderHook(() => useResolveVariables(), {
      wrapper: TestProviders,
    });

    const formData: RestFormData = {
      method: 'POST',
      endpoint: 'https://api.example.com/data',
      headers: [
        { key: 'Authorization', value: 'Bearer {{existingVar}}' },
        { key: 'X-API-Key', value: '{{missingVar}}' },
      ],
      body: { type: 'json', value: '{}' },
    };

    const resolved = result.current.resolveVariables(formData);

    expect(resolved.headers).toEqual([
      { key: 'Authorization', value: 'Bearer value' },
      { key: 'X-API-Key', value: '{{missingVar}}' },
    ]);
    expect(mockWarning).toHaveBeenCalledWith('Variable "missingVar" is not defined');
  });

  it('should handle empty variables array', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([[], vi.fn()]);

    const { result } = renderHook(() => useResolveVariables(), {
      wrapper: TestProviders,
    });

    const formData: RestFormData = {
      method: 'GET',
      endpoint: 'https://api.example.com/{{userId}}',
      headers: [],
      body: { type: 'json', value: '{}' },
    };

    const resolved = result.current.resolveVariables(formData);

    expect(resolved.endpoint).toBe('https://api.example.com/{{userId}}');
    expect(mockWarning).toHaveBeenCalledWith('Variable "userId" is not defined');
  });

  it('should handle variables with whitespace', async () => {
    const { useAtom } = await import('jotai');
    (useAtom as Mock).mockReturnValue([
      [
        { id: 1, name: '{{  userId  }}', value: '123' },
        { id: 2, name: '{{userName}}', value: 'John' },
      ],
      vi.fn(),
    ]);

    const { result } = renderHook(() => useResolveVariables(), {
      wrapper: TestProviders,
    });

    const formData: RestFormData = {
      method: 'GET',
      endpoint: 'https://api.example.com/{{  userId  }}/{{userName}}',
      headers: [],
      body: { type: 'json', value: '{}' },
    };

    const resolved = result.current.resolveVariables(formData);

    expect(resolved.endpoint).toBe('https://api.example.com/123/John');
  });
});
