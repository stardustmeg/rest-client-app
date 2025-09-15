import type { BodyEditorRequestBody } from '../domains/rest-client/components/BodyEditor';
import type { KeyValue } from '../domains/rest-client/components/KeyValueEditor';

export interface GenerateCodeSnippetParams {
  method: string;
  url: string;
  headers: KeyValue[];
  body: BodyEditorRequestBody;
  language: string;
  variant: string;
}

export interface ProxyResponse {
  ok: boolean;
  requestMethod: string;
  endpoint: string;
  requestHeaders: KeyValue[];
  requestTimestamp: number;
  requestDuration: number;
  responseStatusCode: number;
  requestSize: number;
  responseSize: number;
  responseBody?: { type: string; value?: unknown };
  errorDetails: string | null;
}
