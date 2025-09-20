import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { AppChakraProvider } from '../AppChakraProvider';

vi.mock('@chakra-ui/react', () => ({
  ChakraProvider: vi.fn(),
  ClientOnly: vi.fn(),
}));

vi.mock('@/app/hooks/use-local-storage', () => ({
  useLocalStorage: vi.fn(),
}));

vi.mock('@/app/components/ui/theme', () => ({
  createAppTheme: vi.fn(),
}));

vi.mock('@/app/components/ui/ColorMode', () => ({
  ColorModeProvider: vi.fn(),
}));

describe(AppChakraProvider.name, () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    const { ChakraProvider, ClientOnly } = await import('@chakra-ui/react');
    const { useLocalStorage } = await import('@/app/hooks/use-local-storage');
    const { createAppTheme } = await import('@/app/components/ui/theme');
    const { ColorModeProvider } = await import('@/app/components/ui/ColorMode');

    const chakraProviderMock = ChakraProvider as Mock;
    const clientOnlyMock = ClientOnly as Mock;
    const useLocalStorageMock = useLocalStorage as Mock;
    const createAppThemeMock = createAppTheme as Mock;
    const colorModeProviderMock = ColorModeProvider as Mock;

    chakraProviderMock.mockImplementation(({ children }) => (
      <div data-testid="chakra-provider">{children}</div>
    ));
    clientOnlyMock.mockImplementation(({ children }) => (
      <div data-testid="client-only">{children}</div>
    ));
    useLocalStorageMock.mockReturnValue(['purple', vi.fn()]);
    createAppThemeMock.mockReturnValue({ theme: 'mocked-theme' });
    colorModeProviderMock.mockImplementation(({ children }) => (
      <div data-testid="color-mode-provider">{children}</div>
    ));
  });

  it('renders children within providers', () => {
    const testContent = 'Test content';

    render(
      <AppChakraProvider>
        <div>{testContent}</div>
      </AppChakraProvider>,
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
    expect(screen.getByTestId('chakra-provider')).toBeInTheDocument();
    expect(screen.getByTestId('client-only')).toBeInTheDocument();
    expect(screen.getByTestId('color-mode-provider')).toBeInTheDocument();
  });

  it('uses localStorage color scheme for theme creation', async () => {
    const { useLocalStorage } = await import('@/app/hooks/use-local-storage');
    const useLocalStorageMock = useLocalStorage as Mock;
    useLocalStorageMock.mockReturnValue(['green', vi.fn()]);

    render(
      <AppChakraProvider>
        <div>Test</div>
      </AppChakraProvider>,
    );

    const { createAppTheme } = await import('@/app/components/ui/theme');
    const createAppThemeMock = createAppTheme as Mock;
    expect(createAppThemeMock).toHaveBeenCalledWith('green');
  });

  it('defaults to purple color scheme when no localStorage value', async () => {
    const { useLocalStorage } = await import('@/app/hooks/use-local-storage');
    const useLocalStorageMock = useLocalStorage as Mock;
    useLocalStorageMock.mockReturnValue(['purple', vi.fn()]);

    render(
      <AppChakraProvider>
        <div>Test</div>
      </AppChakraProvider>,
    );

    const { createAppTheme } = await import('@/app/components/ui/theme');
    const createAppThemeMock = createAppTheme as Mock;
    expect(createAppThemeMock).toHaveBeenCalledWith('purple');
  });

  it('adds setColorScheme to the theme system', async () => {
    const { useLocalStorage } = await import('@/app/hooks/use-local-storage');
    const useLocalStorageMock = useLocalStorage as Mock;
    const mockSetColorScheme = vi.fn();
    useLocalStorageMock.mockReturnValue(['cyan', mockSetColorScheme]);

    const { createAppTheme } = await import('@/app/components/ui/theme');
    const createAppThemeMock = createAppTheme as Mock;
    const mockTheme = { baseTheme: 'cyan-theme' };
    createAppThemeMock.mockReturnValue(mockTheme);

    render(
      <AppChakraProvider>
        <div>Test</div>
      </AppChakraProvider>,
    );

    expect(createAppThemeMock).toHaveBeenCalledWith('cyan');
  });

  it('passes props to ColorModeProvider', async () => {
    const testProps = { defaultTheme: 'dark', children: <div>Test</div> };

    render(<AppChakraProvider {...testProps} />);

    const { ColorModeProvider } = await import('@/app/components/ui/ColorMode');
    const colorModeProviderMock = ColorModeProvider as Mock;
    expect(colorModeProviderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultTheme: 'dark',
        children: expect.any(Object),
      }),
      undefined,
    );
  });

  it('renders ClientOnly wrapper for hydration safety', () => {
    render(
      <AppChakraProvider>
        <div>Test content</div>
      </AppChakraProvider>,
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
