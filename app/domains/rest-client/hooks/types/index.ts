export interface ResponseInfoAtom {
  responseStatusCode: number;
  responseSize: number;
  requestDuration: number;
  responseBody: string;
  errorDetails: string | null;
}

export interface CodeGenLanguage {
  key: string;
  label: string;
  selectedVariant: string;
  variants: string[];
}
