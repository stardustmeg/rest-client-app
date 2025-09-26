import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Variables } from '../Variables';

vi.mock('../components/VariablesForm', () => ({
  VariablesForm: () => <div data-testid="variables-form" />,
}));

vi.mock('../components/VariablesContent', () => ({
  VariablesContent: () => <div data-testid="variables-content" />,
}));

describe(Variables.name, () => {
  it('renders VariablesForm and VariablesContent components', () => {
    render(<Variables />);

    expect(screen.getByTestId('variables-form')).toBeInTheDocument();
    expect(screen.getByTestId('variables-content')).toBeInTheDocument();
  });

  it('renders components in correct order', () => {
    const { container } = render(<Variables />);

    const children = container.children;
    expect(children[0]).toHaveAttribute('data-testid', 'variables-form');
    expect(children[1]).toHaveAttribute('data-testid', 'variables-content');
  });
});
