import { toaster } from '@/app/components/ui/Toaster';
import { normalizeError } from '../lib/utils';

const DEFAULT_DURATION = 3000;

export const useToast = () => {
  const success = (message: string, duration = DEFAULT_DURATION) =>
    toaster.create({ title: message, type: 'success', duration, closable: true });

  const error = (message: unknown, duration = DEFAULT_DURATION) => {
    const normalizedMessage = normalizeError(message).message;
    return toaster.create({ title: normalizedMessage, type: 'error', duration, closable: true });
  };

  const warning = (message: string, duration = DEFAULT_DURATION) =>
    toaster.create({ title: message, type: 'warning', duration, closable: true });

  const info = (message: string, duration = DEFAULT_DURATION) =>
    toaster.create({ title: message, type: 'info', duration, closable: true });

  return { success, error, warning, info };
};
