'use client';

import { PageWrapper } from '../components/ui/PageWrapper';
import { RestClient } from '../domains/rest-client/RestClient';

export const RestClientPage = () => {
  return (
    <PageWrapper>
      <RestClient />
    </PageWrapper>
  );
};
