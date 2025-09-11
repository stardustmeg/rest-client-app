import type { SelectOption } from '@/app/components/ui/Select';
import { HTTP_METHOD } from '@/app/lib/constants';

export const HTTP_METHOD_SELECT_OPTIONS: SelectOption[] = [
  { value: HTTP_METHOD.GET, label: HTTP_METHOD.GET },
  { value: HTTP_METHOD.POST, label: HTTP_METHOD.POST },
  { value: HTTP_METHOD.PUT, label: HTTP_METHOD.PUT },
  { value: HTTP_METHOD.PATCH, label: HTTP_METHOD.PATCH },
  { value: HTTP_METHOD.DELETE, label: HTTP_METHOD.DELETE },
  { value: HTTP_METHOD.HEAD, label: HTTP_METHOD.HEAD },
  { value: HTTP_METHOD.OPTIONS, label: HTTP_METHOD.OPTIONS },
  { value: HTTP_METHOD.CONNECT, label: HTTP_METHOD.CONNECT },
  { value: HTTP_METHOD.TRACE, label: HTTP_METHOD.TRACE },
];
