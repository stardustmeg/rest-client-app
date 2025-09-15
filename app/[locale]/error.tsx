'use client';

import type { ErrorBoundaryFallbackProps } from '@/app/components/ui/ErrorBoundaryFallback';
import { ErrorBoundaryFallback } from '@/app/components/ui/ErrorBoundaryFallback';

const ErrorPage = (p: ErrorBoundaryFallbackProps) => {
  return <ErrorBoundaryFallback {...p} />;
};

export default ErrorPage;
