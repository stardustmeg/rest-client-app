import type { SelectOption } from '@/app/components/ui/Select';

export const TEMPORARY_METHOD_SELECT_OPTIONS: SelectOption[] = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
];

export const TEMPORARY_LANGUAGES_SELECT_OPTIONS: SelectOption[] = [
  { value: 'js', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
];

export const TEMPORARY_VARIANTS_SELECT_OPTIONS: SelectOption[] = [
  { value: 'fetch', label: 'Fetch' },
  { value: 'curl', label: 'Curl' },
];
