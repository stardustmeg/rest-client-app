import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { routes } from '@/app/[locale]/routes';
import { useResolveVariables } from '@/app/domains/variables/hooks/use-resolve-variables';
import { useAuth } from '@/app/hooks/use-auth';
import { useToast } from '@/app/hooks/use-toast';
import { encodeRequestUrl, formatJson } from '@/app/lib/utils';
import { sendRequest } from '@/app/server-actions/server-actions';
import { responseInfoAtom } from '../atoms';
import type { RestFormData } from '../components/RestForm';
import { extractFormData } from './helpers';

interface UseSubmitRestFormReturn {
  handleSubmit(previousState: unknown, formData: FormData): Promise<void>;
}

export function useSubmitRestForm(): UseSubmitRestFormReturn {
  const t = useTranslations('restClient.response');

  const { push } = useRouter();
  const { resolveVariables } = useResolveVariables();
  const { userId } = useAuth();

  const setResponseInfo = useSetAtom(responseInfoAtom);

  const { errorToast } = useToast();

  const handleSubmit = useCallback<UseSubmitRestFormReturn['handleSubmit']>(
    async (_previousState, formData) => {
      if (!userId) {
        errorToast(t('userNotAuthenticated'));
        return;
      }

      const data = extractFormData(formData);

      let resolvedData: RestFormData;

      try {
        resolvedData = resolveVariables(data);
      } catch (e) {
        errorToast(e);
        return;
      }

      const url = encodeRequestUrl(data, errorToast);
      push(`${routes.restClient.path}/${url}`);

      const response = await sendRequest(resolvedData, userId);

      const responseData = {
        ...response,
        responseBody: formatJson(response.responseBody?.value, errorToast),
      };

      setResponseInfo(responseData);
    },
    [push, setResponseInfo, errorToast, userId, resolveVariables, t],
  );

  return { handleSubmit };
}
