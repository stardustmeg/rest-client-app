'use client';

import type { ErrorBoundaryFallbackProps } from './components/ui/ErrorBoundaryFallback';
import { ErrorBoundaryFallback } from './components/ui/ErrorBoundaryFallback';

const ErrorPage = (p: ErrorBoundaryFallbackProps) => {
  return <ErrorBoundaryFallback {...p} />;
};

export default ErrorPage;
