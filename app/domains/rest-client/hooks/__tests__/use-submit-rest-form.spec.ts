import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { useSubmitRestForm } from '../use-submit-rest-form';

const mockUseRouter = vi.fn();
const mockUseResolveVariables = vi.fn();
const mockUseAuth = vi.fn();
const mockUseToast = vi.fn();
const mockUseTranslations = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => mockUseRouter(),
}));

vi.mock('@/app/domains/variables/hooks/use-resolve-variables', () => ({
  useResolveVariables: () => mockUseResolveVariables(),
}));

vi.mock('@/app/hooks/use-auth', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('@/app/hooks/use-toast', () => ({
  useToast: () => mockUseToast(),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => mockUseTranslations(),
}));

vi.mock('jotai', () => ({
  useSetAtom: vi.fn(() => vi.fn()),
}));

vi.mock('@/app/server-actions/server-actions', () => ({
  sendRequest: vi.fn(),
}));

describe(useSubmitRestForm.name, () => {
  const mockPush = vi.fn();
  const mockErrorToast = vi.fn();
  const mockResolveVariables = vi.fn();
  const mockT = vi.fn();

  let mockSendRequest: Mock;

  beforeEach(async () => {
    vi.clearAllMocks();

    const serverActions = await import('@/app/server-actions/server-actions');
    mockSendRequest = serverActions.sendRequest as Mock;

    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUseResolveVariables.mockReturnValue({ resolveVariables: mockResolveVariables });
    mockUseAuth.mockReturnValue({ userId: 'user-123' });
    mockUseToast.mockReturnValue({ errorToast: mockErrorToast });
    mockUseTranslations.mockReturnValue(mockT);
    mockSendRequest.mockResolvedValue({ responseBody: 'success' });
    mockResolveVariables.mockImplementation((data) => data);
    mockT.mockReturnValue('User not authenticated');
  });

  it('returns handleSubmit function', () => {
    const { result } = renderHook(() => useSubmitRestForm());

    expect(result.current.handleSubmit).toBeInstanceOf(Function);
  });

  it('shows error toast when user is not authenticated', async () => {
    mockUseAuth.mockReturnValue({ userId: null });

    const { result } = renderHook(() => useSubmitRestForm());
    const formData = new FormData();

    await act(async () => {
      await result.current.handleSubmit(null, formData);
    });

    expect(mockErrorToast).toHaveBeenCalledWith('User not authenticated');
    expect(mockSendRequest).not.toHaveBeenCalled();
  });

  it('resolves variables and encodes URL correctly', async () => {
    const { result } = renderHook(() => useSubmitRestForm());
    const formData = new FormData();
    formData.append('method', 'GET');
    formData.append('endpoint', 'https://api.example.com/test');

    await act(async () => {
      await result.current.handleSubmit(null, formData);
    });

    expect(mockResolveVariables).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalled();
    expect(mockSendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        endpoint: 'https://api.example.com/test',
      }),
      'user-123',
    );
  });

  it('handles variable resolution errors', async () => {
    const resolutionError = new Error('Variable resolution failed');
    mockResolveVariables.mockImplementation(() => {
      throw resolutionError;
    });

    const { result } = renderHook(() => useSubmitRestForm());
    const formData = new FormData();
    formData.append('method', 'GET');
    formData.append('endpoint', '/test');

    await act(async () => {
      await result.current.handleSubmit(null, formData);
    });

    expect(mockErrorToast).toHaveBeenCalledWith(resolutionError);
    expect(mockSendRequest).not.toHaveBeenCalled();
  });

  it('sends request and updates response info', async () => {
    const mockResponse = {
      responseBody: 'response data',
      statusCode: 200,
    };
    mockSendRequest.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useSubmitRestForm());
    const formData = new FormData();
    formData.append('method', 'GET');
    formData.append('endpoint', '/test');

    await act(async () => {
      await result.current.handleSubmit(null, formData);
    });

    expect(mockSendRequest).toHaveBeenCalled();
  });
});
