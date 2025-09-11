import type { ComponentType } from 'react';

interface WithWrapperProps<T extends object> {
  wrapper: ComponentType<T>;
  children: ComponentType<T>;
}

export function withWrapper<T extends object>({
  wrapper: Wrapper,
  children: Component,
}: WithWrapperProps<T>) {
  return (props: T) => (
    <Wrapper {...props}>
      <Component {...props} />
    </Wrapper>
  );
}
