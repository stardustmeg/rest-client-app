/** biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: <shhhhhhhhhhh> */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { KeyValueEditor } from '../KeyValueEditor';

describe(KeyValueEditor.name, () => {
  it('should render', () => {
    const onChange = vi.fn();
    const onAdd = vi.fn();
    const onDelete = vi.fn();

    render(
      <TestProviders>
        <KeyValueEditor
          items={[]}
          onAdd={onAdd}
          onDelete={onDelete}
          onChange={onChange}
          addButtonText="Add"
          testIdPrefix="key-value-editor"
        />
      </TestProviders>,
    );

    expect(screen.getByTestId('key-value-editor-add-button')).toBeInTheDocument();
  });

  it('should call onAdd when add button is clicked', async () => {
    const onChange = vi.fn();
    const onAdd = vi.fn();
    const onDelete = vi.fn();

    const { user } = renderWithUserEvent(
      <TestProviders>
        <KeyValueEditor
          items={[]}
          onAdd={onAdd}
          onDelete={onDelete}
          onChange={onChange}
          addButtonText="Add"
          testIdPrefix="key-value-editor"
        />
      </TestProviders>,
    );

    await user.click(screen.getByTestId('key-value-editor-add-button'));

    expect(onAdd).toHaveBeenCalled();
  });

  it('should call onChange when key input changes', async () => {
    const onChange = vi.fn();
    const onAdd = vi.fn();
    const onDelete = vi.fn();

    const { user } = renderWithUserEvent(
      <TestProviders>
        <KeyValueEditor
          onChange={onChange}
          items={[{ key: '', value: '' }]}
          onAdd={onAdd}
          onDelete={onDelete}
          addButtonText="Add"
          testIdPrefix="key-value-editor"
        />
      </TestProviders>,
    );

    await user.type(screen.getByTestId('key-value-editor-key-input-0'), 't');

    expect(onChange).toHaveBeenLastCalledWith('key', 't', 0);
  });

  it('should call onChange when value input changes', async () => {
    const onChange = vi.fn();
    const onAdd = vi.fn();
    const onDelete = vi.fn();

    const { user } = renderWithUserEvent(
      <TestProviders>
        <KeyValueEditor
          onChange={onChange}
          items={[{ key: '', value: '' }]}
          onAdd={onAdd}
          onDelete={onDelete}
          addButtonText="Add"
          testIdPrefix="key-value-editor"
        />
      </TestProviders>,
    );

    await user.type(screen.getByTestId('key-value-editor-value-input-0'), 't');

    expect(onChange).toHaveBeenLastCalledWith('value', 't', 0);
  });
});
