import type { RestFormData } from '../../components/RestForm';

const extractHeaders = (formData: FormData): { key: string; value: string }[] => {
  const headers: { key: string; value: string }[] = [];
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('header-key-') && value) {
      const index = key.replace('header-key-', '');
      const headerValue = formData.get(`header-value-${index}`);
      if (headerValue) {
        headers.push({ key: value as string, value: headerValue as string });
      }
    }
  }
  return headers;
};

const extractBody = (formData: FormData) => {
  const bodyType = formData.get('bodyType') as 'json' | 'text';
  const bodyValue = formData.get('bodyValue') as string;
  return bodyType
    ? { type: bodyType, value: bodyValue || '' }
    : { type: 'json' as const, value: '' };
};

export const extractFormData = (formData: FormData): RestFormData => {
  const method = formData.get('method') as string;
  const endpoint = formData.get('endpoint') as string;
  const headers = extractHeaders(formData);
  const body = extractBody(formData);

  return { method, endpoint, headers, body };
};
