import { Enabled } from '@/app/components/ui/Enabled';
import { PageWrapper } from '@/app/components/ui/PageWrapper';
import { RestClient } from '@/app/domains/rest-client/RestClient';
import { CodeGenLanguageProvider } from '../domains/rest-client/components/CodeGenLanguageProvider';
import { getLanguageList } from '../server-actions/server-actions';

export const RestClientPage = async () => {
  const languageList = await getLanguageList().then((list) =>
    list.map((lang) => ({
      key: lang.key,
      label: lang.label,
      selectedVariant: lang.variants[0].key,
      variants: lang.variants.map((variant) => variant.key),
    })),
  );

  return (
    <PageWrapper>
      <Enabled feature="restClient">
        <CodeGenLanguageProvider languageList={languageList}>
          <RestClient />
        </CodeGenLanguageProvider>
      </Enabled>
    </PageWrapper>
  );
};
