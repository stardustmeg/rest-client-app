import type MonacoEditor from '@monaco-editor/react';
import { render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { BodyEditor } from '../BodyEditor';

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

describe(BodyEditor.name, () => {
  it('should render', () => {
    render(
      <TestProviders>
        <BodyEditor type="json" title="Test" dataTestId="body-editor-textarea" readOnly={false} />
      </TestProviders>,
    );

    expect(screen.getByTestId('body-editor-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('body-editor-title')).toBeInTheDocument();
    expect(screen.getByTestId('body-editor-title')).toHaveTextContent('Test');
    expect(screen.getByTestId('body-editor-format-button')).toBeInTheDocument();
  });

  it('should call onChange with json type when value changes', async () => {
    const onChange = vi.fn();

    const { user } = renderWithUserEvent(
      <TestProviders>
        <BodyEditor
          type="json"
          onChange={onChange}
          dataTestId="body-editor-textarea"
          readOnly={false}
        />
      </TestProviders>,
    );

    await user.type(screen.getByTestId('body-editor-textarea'), 'Hello');

    expect(onChange).toHaveBeenCalledWith({ type: 'json', value: 'Hello' });
  });

  it('should call onChange with text type when value changes', async () => {
    const onChange = vi.fn();

    const { user } = renderWithUserEvent(
      <TestProviders>
        <BodyEditor
          type="text"
          onChange={onChange}
          dataTestId="body-editor-textarea"
          readOnly={false}
        />
      </TestProviders>,
    );

    await user.type(screen.getByTestId('body-editor-textarea'), 'Hello');

    expect(onChange).toHaveBeenCalledWith({ type: 'text', value: 'Hello' });
  });
});
