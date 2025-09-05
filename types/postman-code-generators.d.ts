declare module 'postman-code-generators' {
  import { Request } from 'postman-collection';

  interface CodegenVariant {
    key: string;
  }

  interface CodegenLanguage {
    key: string;
    label: string;
    syntax_mode: string;
    variants: CodegenVariant[];
  }

  type CodegenOptionType = 'boolean' | 'enum' | 'positiveInteger';

  interface BaseCodegenOption {
    name: string;
    id: string;
    type: CodegenOptionType;
    default: unknown;
    description: string;
  }

  interface EnumCodegenOption extends BaseCodegenOption {
    type: 'enum';
    availableOptions: string[];
    default: string;
  }

  interface SimpleCodegenOption extends BaseCodegenOption {
    type: 'boolean' | 'positiveInteger';
    default: boolean | number;
  }

  type CodegenOption = EnumCodegenOption | SimpleCodegenOption;

  function getLanguageList(): CodegenLanguage[];


  function getOptions(
    language: string,
    variant: string,
    callback: (error: Error | null, options?: CodegenOption[]) => void
  ): void;


  function convert(
    language: string,
    variant: string,
    request: Request,
    options: Record<string, unknown>,
    callback: (error: Error | null, snippet?: string) => void
  ): void;
}
