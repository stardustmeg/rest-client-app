import { Authenticated, Unauthenticated } from 'convex/react';
import type { ComponentType } from 'react';

export const withAuthGuard = <T extends object>(
  AuthenticatedComponent: ComponentType<T>,
  UnauthenticatedComponent: ComponentType<T>,
) => {
  return function GuardedComponent(props: T) {
    return (
      <>
        <Authenticated>
          <AuthenticatedComponent {...props} />
        </Authenticated>
        <Unauthenticated>
          <UnauthenticatedComponent {...props} />
        </Unauthenticated>
      </>
    );
  };
};
