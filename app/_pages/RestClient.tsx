import { Enabled } from '@/app/components/ui/Enabled';
import { PageWrapper } from '@/app/components/ui/PageWrapper';
import { RestClient } from '@/app/domains/rest-client/RestClient';

export const RestClientPage = () => {
  return (
    <PageWrapper>
      <Enabled feature="restClient">
        <RestClient />
      </Enabled>
    </PageWrapper>
  );
};
