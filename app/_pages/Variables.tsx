import { Enabled } from '@/app/components/ui/Enabled';
import { PageWrapper } from '@/app/components/ui/PageWrapper';
import { Variables } from '@/app/domains/variables/Variables';

export const VariablesPage = () => {
  return (
    <PageWrapper>
      <Enabled feature="variables">
        <Variables />
      </Enabled>
    </PageWrapper>
  );
};
