export interface ResponseInfoAtom {
  responseStatusCode: number;
  responseSize: number;
  requestDuration: number;
  responseBody: string;
  ok: boolean;
  errorDetails: string | null;
}
