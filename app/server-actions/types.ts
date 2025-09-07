import type { BodyEditorRequestBody } from '../domains/rest-client/components/BodyEditor';
import type { RequestHeader } from '../domains/rest-client/components/HeadersEditor';

export interface GenerateCodeSnippetParams {
  method: string;
  url: string;
  headers: RequestHeader[];
  body: BodyEditorRequestBody;
  language: string;
  variant: string;
}
