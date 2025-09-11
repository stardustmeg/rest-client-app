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

export interface SuccessResponse {
  ok: true;
  responseSize: number;
  time: number;
  status: number;
  body: unknown;
}

export interface FailedResponse {
  ok: false;
  responseSize: number;
  time: number;
  status: number;
  error: string;
}
