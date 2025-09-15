export interface ResponseInfoAtom {
  responseStatusCode: number;
  responseSize: number;
  requestDuration: number;
  responseBody: string;
  errorDetails: string | null;
}
