// see: https://ui.shadcn.com/docs/components/skeleton

import cn from 'classnames';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-subtle', className)} {...props} />;
}
