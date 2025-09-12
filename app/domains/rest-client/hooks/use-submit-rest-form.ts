import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { encodeRequestUrl, formatJson, normalizeError } from '@/app/lib/utils';
import { sendRequest } from '@/app/server-actions/server-actions';
import { failedResponseAtom, responseBodyAtom, responseInformationAtom } from '../atoms';
import type { RestFormData } from '../components/RestForm';

interface UseSubmitRestFormReturn {
  processing: boolean;

  handleSubmit(data: RestFormData): void;
}

export function useSubmitRestForm(): UseSubmitRestFormReturn {
  const { push } = useRouter();

  const setResponseInfo = useSetAtom(responseInformationAtom);
  const setResponseBody = useSetAtom(responseBodyAtom);
  const setFailedResponse = useSetAtom(failedResponseAtom);

  const [processing, setProcessing] = useState(false);

  const handleSubmit = useCallback(
    async (data: RestFormData) => {
      setProcessing(true);
      setResponseBody('');
      setFailedResponse({ ok: true, lastErrorMessage: '' });

      try {
        const url = encodeRequestUrl(data);
        push(`/rest-client/${url}`);

        const response = await sendRequest(data);

        setResponseInfo({
          time: response.requestDuration,
          status: response.responseStatusCode,
          size: response.responseSize,
        });

        if (response.ok) {
          const formattedBody = formatJson(response.body?.value, (_e) => {
            // console.log(e.message);
          });

          setResponseBody(formattedBody);
          setFailedResponse({ ok: true, lastErrorMessage: '' });
        } else {
          setFailedResponse({
            ok: false,
            lastErrorMessage: normalizeError(response.errorDetails).message,
          });
        }
      } catch (err) {
        setResponseBody('');
        setFailedResponse({ ok: false, lastErrorMessage: normalizeError(err).message });
      } finally {
        setProcessing(false);
      }
    },
    [push, setResponseInfo, setResponseBody, setFailedResponse],
  );

  return { processing, handleSubmit };
}
