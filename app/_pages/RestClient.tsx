import { Enabled } from '@/app/components/ui/Enabled';
import { PageWrapper } from '@/app/components/ui/PageWrapper';
import { RestClient } from '@/app/domains/rest-client/RestClient';

export const RestClientPage = ({ params }: { params?: string[] | undefined }) => {
  return (
    <PageWrapper>
      <Enabled feature="restClient">
        <RestClient params={params} />
      </Enabled>
    </PageWrapper>
  );
};
