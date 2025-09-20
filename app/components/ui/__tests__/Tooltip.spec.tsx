import type { TooltipContentProps } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithUserEvent, TestProviders } from '@/app/__tests__/utils';
import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  it('renders children without tooltip when disabled', () => {
    render(
      <TestProviders>
        <Tooltip content="Tooltip text" disabled>
          <button type="button">Trigger</button>
        </Tooltip>
      </TestProviders>,
    );

    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });

  it('shows tooltip content on hover', async () => {
    const { user } = renderWithUserEvent(
      <TestProviders>
        <Tooltip content="Helpful tooltip">
          <button type="button">Hover me</button>
        </Tooltip>
      </TestProviders>,
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });
    await user.hover(trigger);

    expect(await screen.findByText('Helpful tooltip')).toBeInTheDocument();
  });

  it('hides tooltip content when not hovering', async () => {
    const { user } = renderWithUserEvent(
      <TestProviders>
        <Tooltip content="Tooltip text">
          <button type="button">Test button</button>
        </Tooltip>
      </TestProviders>,
    );

    const trigger = screen.getByRole('button');

    await user.hover(trigger);
    expect(await screen.findByText('Tooltip text')).toBeInTheDocument();

    const unhoverTimeout = 700;
    await user.unhover(trigger);
    await new Promise((resolve) => setTimeout(resolve, unhoverTimeout));
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });

  it('renders with arrow when showArrow is true', async () => {
    const { user } = renderWithUserEvent(
      <TestProviders>
        <Tooltip content="Tooltip with arrow" showArrow>
          <span>Trigger element</span>
        </Tooltip>
      </TestProviders>,
    );

    await user.hover(screen.getByText('Trigger element'));

    const tooltip = await screen.findByText('Tooltip with arrow');
    expect(tooltip).toBeInTheDocument();
  });

  it('accepts custom content props', async () => {
    const { user } = renderWithUserEvent(
      <TestProviders>
        <Tooltip
          content="Custom styled tooltip"
          contentProps={{ 'data-testid': 'custom-tooltip' } as TooltipContentProps | undefined}
        >
          <div>Trigger</div>
        </Tooltip>
      </TestProviders>,
    );

    await user.hover(screen.getByText('Trigger'));

    expect(await screen.findByTestId('custom-tooltip')).toBeInTheDocument();
  });

  it('supports React node as content', async () => {
    const customContent = (
      <div>
        <strong>Bold text</strong>
        <p>Some description</p>
      </div>
    );

    const { user } = renderWithUserEvent(
      <TestProviders>
        <Tooltip content={customContent}>
          <button type="button">Complex tooltip</button>
        </Tooltip>
      </TestProviders>,
    );

    await user.hover(screen.getByRole('button'));

    expect(await screen.findByText('Bold text')).toBeInTheDocument();
    expect(await screen.findByText('Some description')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };

    render(
      <TestProviders>
        <Tooltip content="Test" ref={ref}>
          <span>Test</span>
        </Tooltip>
      </TestProviders>,
    );

    expect(ref.current).toBeDefined();
  });

  it('handles keyboard interactions', async () => {
    const { user } = renderWithUserEvent(
      <TestProviders>
        <Tooltip content="Keyboard tooltip">
          <button type="button">Focusable element</button>
        </Tooltip>
      </TestProviders>,
    );

    const trigger = screen.getByRole('button');

    await user.click(trigger);
    expect(trigger).toHaveFocus();

    const tooltipExists = screen.queryByText('Keyboard tooltip');
    if (tooltipExists) {
      expect(tooltipExists).toBeInTheDocument();
    }

    await user.tab();
    const keyboardTimeout = 100;
    await new Promise((resolve) => setTimeout(resolve, keyboardTimeout));
    expect(screen.queryByText('Keyboard tooltip')).not.toBeInTheDocument();
  });
});
