declare module 'postman-code-generators' {
  import { Request } from 'postman-collection';

  interface CodeGenVariant {
    key: string;
  }

  interface CodeGenLanguage {
    key: string;
    label: string;
    syntax_mode: string;
    variants: CodeGenVariant[];
  }

  type CodeGenOptionType = 'boolean' | 'enum' | 'positiveInteger';

  interface BaseCodeGenOption {
    name: string;
    id: string;
    type: CodeGenOptionType;
    default: unknown;
    description: string;
  }

  interface EnumCodeGenOption extends BaseCodeGenOption {
    type: 'enum';
    availableOptions: string[];
    default: string;
  }

  interface SimpleCodeGenOption extends BaseCodeGenOption {
    type: 'boolean' | 'positiveInteger';
    default: boolean | number;
  }

  type CodeGenOption = EnumCodeGenOption | SimpleCodeGenOption;

  function getLanguageList(): CodeGenLanguage[];

  function getOptions(
    language: string,
    variant: string,
    callback: (error: Error | null, options?: CodeGenOption[]) => void,
  ): void;

  function convert(
    language: string,
    variant: string,
    request: Request,
    options: Record<string, unknown>,
    callback: (error: Error | null, snippet?: string) => void,
  ): void;
}
