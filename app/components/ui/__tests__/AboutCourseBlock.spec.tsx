import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { AboutCourseBlock } from '@/app/components/ui/AboutCourseBlock';

describe('AboutCourseBlock', () => {
  it('should render course description', () => {
    render(
      <TestProviders>
        <AboutCourseBlock />
      </TestProviders>,
    );
    expect(screen.getByText(/description/i)).toBeInTheDocument();
  });

  it(`should render school's link`, () => {
    render(
      <TestProviders>
        <AboutCourseBlock />
      </TestProviders>,
    );
    const link = screen.getByRole('link', { name: /school/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
