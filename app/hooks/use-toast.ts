import { toaster } from '@/app/components/ui/Toaster';
import { normalizeError } from '../lib/utils';

const DEFAULT_DURATION = 3000;

const successToast = (message: string, duration = DEFAULT_DURATION) => {
  return toaster.create({ title: message, type: 'success', duration, closable: true });
};

const errorToast = (message: unknown, duration = DEFAULT_DURATION) => {
  const normalizedMessage = normalizeError(message).message;
  return toaster.create({ title: normalizedMessage, type: 'error', duration, closable: true });
};

const warningToast = (message: string, duration = DEFAULT_DURATION) => {
  return toaster.create({ title: message, type: 'warning', duration, closable: true });
};

const infoToast = (message: string, duration = DEFAULT_DURATION) => {
  return toaster.create({ title: message, type: 'info', duration, closable: true });
};

export const useToast = () => ({ successToast, errorToast, warningToast, infoToast });
