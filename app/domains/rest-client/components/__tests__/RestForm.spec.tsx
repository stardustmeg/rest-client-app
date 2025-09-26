import type MonacoEditor from '@monaco-editor/react';
import { render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { RestForm } from '../RestForm';

type MonacoEditorProps = ComponentProps<typeof MonacoEditor>;

interface MockEditorProps extends MonacoEditorProps {
  'data-testid'?: string;
}

type OnChangeEvent = Parameters<NonNullable<MonacoEditorProps['onChange']>>[1];

vi.mock('@monaco-editor/react', () => {
  return {
    __esModule: true,
    default: ({ value, onChange, ...props }: MockEditorProps) => (
      <textarea
        data-testid={props['data-testid']}
        value={value}
        onChange={(e) => onChange?.(e.target.value, {} as OnChangeEvent)}
      />
    ),
  };
});

describe(RestForm.name, () => {
  it('should render', () => {
    const onSubmit = vi.fn();

    render(
      <TestProviders>
        <RestForm onSubmit={onSubmit} />
      </TestProviders>,
    );

    expect(screen.getByTestId('rest-form')).toBeInTheDocument();
    expect(screen.getByTestId('rest-form-submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('rest-form-method-select')).toBeInTheDocument();
    expect(screen.getByTestId('rest-form-endpoint-input')).toBeInTheDocument();
    expect(screen.getByTestId('rest-form-body-editor-json')).toBeInTheDocument();
    expect(screen.getByTestId('rest-form-body-editor-text')).toBeInTheDocument();
  });

  it('should call onSubmit when form is submitted', async () => {
    const onSubmit = vi.fn();

    const { user } = renderWithUserEvent(
      <TestProviders>
        <RestForm onSubmit={onSubmit} />
      </TestProviders>,
    );

    await user.type(screen.getByTestId('rest-form-endpoint-input'), '/test');
    await user.selectOptions(screen.getByTestId('rest-form-method-select'), 'POST');
    await user.type(screen.getByTestId('rest-form-body-editor-json'), '{{"key": "value"}');

    await user.click(screen.getByTestId('rest-form-submit-button'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    const formData = onSubmit.mock.calls[0][0] as FormData;

    expect(formData.get('method')).toBe('POST');
    expect(formData.get('endpoint')).toBe('/test');
    expect(formData.get('bodyType')).toBe('json');
    expect(formData.get('bodyValue')).toBe('{"key": "value"}');
  });
});
