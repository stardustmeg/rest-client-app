import { Authenticated, Unauthenticated } from 'convex/react';
import type { ComponentType } from 'react';

type WithAuthGuardProps<T> =
  | {
      authenticated: ComponentType<T>;
      unauthenticated?: ComponentType<T>;
    }
  | { authenticated?: ComponentType<T>; unauthenticated: ComponentType<T> };

export const withAuthGuard = <T extends object>({
  authenticated: AuthenticatedComponent,
  unauthenticated: UnauthenticatedComponent,
}: WithAuthGuardProps<T>) => {
  return function GuardedComponent(props: T) {
    return (
      <>
        <Authenticated>
          {AuthenticatedComponent && <AuthenticatedComponent {...props} />}
        </Authenticated>
        <Unauthenticated>
          {UnauthenticatedComponent && <UnauthenticatedComponent {...props} />}
        </Unauthenticated>
      </>
    );
  };
};
