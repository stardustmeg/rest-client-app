/** biome-ignore-all lint/style/useNamingConvention: <test> */
/** biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: <tests> */

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { RestClient } from '../RestClient';

const mockUseParams = vi.fn();
const mockUseSearchParams = vi.fn();
const mockUseToast = vi.fn();
const mockUseTheme = vi.fn();
const mockUseActionState = vi.fn();
const mockUseAtomValue = vi.fn();
const mockUseInitFormAtoms = vi.fn();
const mockUseSubmitRestForm = vi.fn();

vi.mock('next/navigation', () => ({
  useParams: () => mockUseParams(),
  useSearchParams: () => mockUseSearchParams(),
}));

vi.mock('@/app/hooks/use-toast', () => ({
  useToast: () => mockUseToast(),
}));

vi.mock('next-themes', () => ({
  useTheme: () => mockUseTheme(),
}));

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useActionState: () => mockUseActionState(),
  };
});

vi.mock('jotai', () => ({
  useAtomValue: () => mockUseAtomValue(),
}));

vi.mock('../hooks/use-init-form-atoms', () => ({
  useInitFormAtoms: () => mockUseInitFormAtoms(),
}));

vi.mock('../hooks/use-submit-rest-form', () => ({
  useSubmitRestForm: () => mockUseSubmitRestForm(),
}));

vi.mock('../components/RestForm', () => ({
  RestForm: ({ disabled, onSubmit }: { disabled: boolean; onSubmit: () => void }) => (
    <div data-testid="rest-form" data-disabled={disabled} data-onsubmit={onSubmit} />
  ),
}));

vi.mock('../components/BodyEditor', () => ({
  BodyEditor: ({
    value,
    theme,
    readOnly,
    type,
  }: {
    value: string;
    theme: string;
    readOnly: boolean;
    type: string;
  }) => (
    <div
      data-testid="body-editor"
      data-value={value}
      data-theme={theme}
      data-readonly={readOnly}
      data-type={type}
    />
  ),
}));

vi.mock('../components/CodeGeneration', () => ({
  CodeGeneration: () => <div data-testid="code-generation" />,
}));

vi.mock('@/app/components/ui/ResponseInformation', () => ({
  ResponseInformation: ({
    status,
    size,
    duration,
  }: {
    status: number;
    size: string;
    duration: string;
  }) => (
    <div
      data-testid="response-information"
      data-status={status}
      data-size={size}
      data-duration={duration}
    />
  ),
}));

describe(RestClient.name, () => {
  const mockErrorToast = vi.fn();
  const mockHandleSubmit = vi.fn();
  const mockInitFormAtoms = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseParams.mockReturnValue({ locale: 'en', params: undefined });
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    mockUseToast.mockReturnValue({ errorToast: mockErrorToast });
    mockUseTheme.mockReturnValue({ resolvedTheme: 'light' });
    mockUseActionState.mockReturnValue([null, mockHandleSubmit, false]);
    mockUseAtomValue.mockReturnValue({
      responseSize: '1.2 KB',
      requestDuration: '150ms',
      responseBody: '{"success": true}',
      responseStatusCode: 200,
      errorDetails: null,
    });
    mockUseInitFormAtoms.mockReturnValue(mockInitFormAtoms);
    mockUseSubmitRestForm.mockReturnValue({ handleSubmit: mockHandleSubmit });
  });

  it('renders the main layout components', () => {
    render(
      <TestProviders>
        <RestClient />
      </TestProviders>,
    );

    expect(screen.getByTestId('rest-form')).toBeInTheDocument();
    expect(screen.getByTestId('response-information')).toBeInTheDocument();
    expect(screen.getByTestId('body-editor')).toBeInTheDocument();
  });

  it('passes correct props to ResponseInformation', () => {
    render(
      <TestProviders>
        <RestClient />
      </TestProviders>,
    );

    const responseInfo = screen.getByTestId('response-information');
    expect(responseInfo).toHaveAttribute('data-status', '200');
    expect(responseInfo).toHaveAttribute('data-size', '1.2 KB');
    expect(responseInfo).toHaveAttribute('data-duration', '150ms');
  });

  it('passes correct props to BodyEditor when no error', () => {
    render(
      <TestProviders>
        <RestClient />
      </TestProviders>,
    );

    const bodyEditor = screen.getByTestId('body-editor');
    expect(bodyEditor).toHaveAttribute('data-value', '{"success": true}');
    expect(bodyEditor).toHaveAttribute('data-theme', 'light');
    expect(bodyEditor).toHaveAttribute('data-readonly', 'true');
    expect(bodyEditor).toHaveAttribute('data-type', 'json');
  });

  it('renders error message when there are error details', () => {
    mockUseAtomValue.mockReturnValue({
      responseSize: '0 B',
      requestDuration: '0ms',
      responseBody: null,
      responseStatusCode: 500,
      errorDetails: 'Network error',
    });

    render(
      <TestProviders>
        <RestClient />
      </TestProviders>,
    );

    expect(screen.getByText('Network error')).toBeInTheDocument();
    expect(screen.queryByTestId('body-editor')).not.toBeInTheDocument();
  });

  it('disables form when pending', () => {
    mockUseActionState.mockReturnValue([null, mockHandleSubmit, true]);

    render(
      <TestProviders>
        <RestClient />
      </TestProviders>,
    );

    const restForm = screen.getByTestId('rest-form');
    expect(restForm).toHaveAttribute('data-disabled', 'true');
  });

  it('passes correct theme to BodyEditor', () => {
    mockUseTheme.mockReturnValue({ resolvedTheme: 'dark' });

    render(
      <TestProviders>
        <RestClient />
      </TestProviders>,
    );

    const bodyEditor = screen.getByTestId('body-editor');
    expect(bodyEditor).toHaveAttribute('data-theme', 'dark');
  });
});
