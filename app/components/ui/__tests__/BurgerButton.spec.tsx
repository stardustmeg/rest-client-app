import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { BurgerButton } from '../BurgerButton';

describe('BurgerButton', () => {
  it('should render button with hamburger icon', () => {
    const mockOnClick = vi.fn();

    render(
      <TestProviders>
        <BurgerButton onClick={mockOnClick} />
      </TestProviders>,
    );

    const button = screen.getByRole('button', { name: /open menu/i });
    expect(button).toBeInTheDocument();
  });

  it('should have correct accessibility attributes', () => {
    const mockOnClick = vi.fn();

    render(
      <TestProviders>
        <BurgerButton onClick={mockOnClick} />
      </TestProviders>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Open menu');
  });

  it('should call onClick when clicked', async () => {
    const mockOnClick = vi.fn();
    const { user } = renderWithUserEvent(
      <TestProviders>
        <BurgerButton onClick={mockOnClick} />
      </TestProviders>,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should have correct button styling', () => {
    const mockOnClick = vi.fn();

    render(
      <TestProviders>
        <BurgerButton onClick={mockOnClick} />
      </TestProviders>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('chakra-button');
  });

  it('should handle keyboard events', async () => {
    const mockOnClick = vi.fn();
    const { user } = renderWithUserEvent(
      <TestProviders>
        <BurgerButton onClick={mockOnClick} />
      </TestProviders>,
    );

    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{Enter}');

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should handle space key press', async () => {
    const mockOnClick = vi.fn();
    const { user } = renderWithUserEvent(
      <TestProviders>
        <BurgerButton onClick={mockOnClick} />
      </TestProviders>,
    );

    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{ }');

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
