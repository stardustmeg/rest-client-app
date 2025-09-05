import { Enabled } from '../components/ui/Enabled';
import { PageWrapper } from '../components/ui/PageWrapper';
import { RestClient } from '../domains/rest-client/RestClient';

export const RestClientPage = () => {
  return (
    <PageWrapper>
      <Enabled feature="restClient">
        <RestClient />
      </Enabled>
    </PageWrapper>
  );
};
