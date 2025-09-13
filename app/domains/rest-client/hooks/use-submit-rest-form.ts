import { useMutation } from 'convex/react';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useResolveVariables } from '@/app/domains/variables/hooks/use-resolve-variables';
import { useAuth } from '@/app/hooks/use-auth';
import { useToast } from '@/app/hooks/use-toast';
import { encodeRequestUrl, formatJson, normalizeError } from '@/app/lib/utils';
import { sendRequest } from '@/app/server-actions/server-actions';
import { api } from '@/convex/_generated/api';
import { failedResponseAtom, responseBodyAtom, responseInformationAtom } from '../atoms';
import type { RestFormData } from '../components/RestForm';

interface UseSubmitRestFormReturn {
  processing: boolean;
  handleSubmit(data: RestFormData): Promise<void>;
}

export function useSubmitRestForm(): UseSubmitRestFormReturn {
  const { push } = useRouter();
  const { resolveVariables } = useResolveVariables();
  const { userId } = useAuth();
  const createHistoryItemMutation = useMutation(api.history.createHistoryItem);

  const setResponseInfo = useSetAtom(responseInformationAtom);
  const setResponseBody = useSetAtom(responseBodyAtom);
  const setFailedResponse = useSetAtom(failedResponseAtom);

  const [processing, setProcessing] = useState(false);

  const { error } = useToast();

  const handleSubmit = useCallback<UseSubmitRestFormReturn['handleSubmit']>(
    async (data) => {
      setProcessing(true);
      setResponseBody('');
      setFailedResponse({ ok: true, lastErrorMessage: '' });

      try {
        const resolvedData = resolveVariables(data);
        const url = encodeRequestUrl(data, (e) => error(e.message));
        push(`/rest-client/${url}`);

        const response = await sendRequest(resolvedData);

        userId &&
          createHistoryItemMutation({
            ...response,
            userId,
            body: { type: data.body.type, value: data.body.value },
          });

        setResponseInfo({
          time: response.requestDuration,
          status: response.responseStatusCode,
          size: response.responseSize,
        });

        if (response.ok) {
          const formattedBody = formatJson(response.body?.value, (e) => error(e.message));

          setResponseBody(formattedBody);
          setFailedResponse({ ok: true, lastErrorMessage: '' });
        } else {
          setFailedResponse({
            ok: false,
            lastErrorMessage: normalizeError(response.errorDetails).message,
          });
        }
      } catch (err) {
        const errorMessage = normalizeError(err).message;
        setResponseBody('');
        setFailedResponse({ ok: false, lastErrorMessage: errorMessage });
        error(errorMessage);
      } finally {
        setProcessing(false);
      }
    },
    [
      push,
      setResponseInfo,
      setResponseBody,
      setFailedResponse,
      error,
      createHistoryItemMutation,
      userId,
      resolveVariables,
    ],
  );

  return { processing, handleSubmit };
}
