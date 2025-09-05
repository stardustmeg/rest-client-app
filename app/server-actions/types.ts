import type { RequestHeader } from '../domains/rest-client/components/HeadersEditor';

export interface GenerateCodeSnippetParams {
  method: string;
  url: string;
  headers: RequestHeader[];
  body: string;
  language: string;
  variant: string;
}
