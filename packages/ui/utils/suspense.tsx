import { FC, forwardRef, ReactNode, RefAttributes, Suspense } from 'react';

export function withSuspense<T, P> (Component: FC<P> & RefAttributes<T>, fallback?: ReactNode) {
  return forwardRef<T, P>(function (props, ref) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} ref={ref} />
      </Suspense>
    );
  });
}

export function wrapSuspense (children: ReactNode, fallback?: ReactNode) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}
