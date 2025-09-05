import type { SelectOption } from '@/app/components/ui/Select';

export const TEMP_METHODS: SelectOption[] = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
];

export const TEMP_LANGUAGES: SelectOption[] = [
  { value: 'js', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
];

export const TEMP_VARIANTS: SelectOption[] = [
  { value: 'fetch', label: 'Fetch' },
  { value: 'curl', label: 'Curl' },
];
