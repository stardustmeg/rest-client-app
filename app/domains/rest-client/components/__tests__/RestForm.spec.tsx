import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { RestForm } from '../RestForm';

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
    expect(onSubmit).toHaveBeenCalledWith({
      method: 'POST',
      endpoint: '/test',
      headers: [{ key: '', value: '' }],
      body: { type: 'json', value: '{"key": "value"}' },
    });
  });
});
