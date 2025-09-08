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
