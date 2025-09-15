import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { useResolveVariables } from '@/app/domains/variables/hooks/use-resolve-variables';
import { useAuth } from '@/app/hooks/use-auth';
import { useToast } from '@/app/hooks/use-toast';
import { encodeRequestUrl } from '@/app/lib/utils';
import { sendRequest } from '@/app/server-actions/server-actions';
import { formDataStore, responseInfoAtom } from '../atoms';
import type { RestFormData } from '../components/RestForm';

interface UseSubmitRestFormReturn {
  handleSubmit(data: RestFormData): Promise<void>;
}

export function useSubmitRestForm(): UseSubmitRestFormReturn {
  const t = useTranslations('restClient.response');

  const { push } = useRouter();
  const { resolveVariables } = useResolveVariables();
  const { userId } = useAuth();

  const setResponseInfo = useSetAtom(responseInfoAtom, { store: formDataStore });

  const { errorToast } = useToast();

  const handleSubmit = useCallback<UseSubmitRestFormReturn['handleSubmit']>(
    async (data) => {
      if (!userId) {
        errorToast(t('userNotAuthenticated'));
        return;
      }

      let resolvedData: RestFormData;

      try {
        resolvedData = resolveVariables(data);
      } catch (e) {
        errorToast(e);
        return;
      }

      const url = encodeRequestUrl(data, (e) => errorToast(e));
      push(`/rest-client/${url}`);

      const response = await sendRequest(resolvedData, userId, (e) => errorToast(e));
      setResponseInfo(response);
    },
    [push, setResponseInfo, errorToast, userId, resolveVariables, t],
  );

  return { handleSubmit };
}
