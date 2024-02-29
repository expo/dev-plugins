import cn from 'classnames';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentProps, forwardRef } from 'react';

const tagVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm',
  {
    variants: {
      variant: {
        primary: 'bg-palette-purple4 text-palette-purple12 border-palette-purple5',
        android: 'bg-palette-green4 text-palette-green12 border-palette-green5',
        ios: 'bg-palette-blue4 text-palette-blue12 border-palette-blue5',
        web: 'bg-palette-orange4 text-palette-orange12 border-palette-orange5',
      },
      size: {
        xs: 'h-6 px-2 text-3xs/4',
        sm: 'h-9 px-4 text-xs',
        md: 'h-10 px-4 text-xs',
        lg: 'h-11 px-6 text-base',
        xl: 'h-12 px-6 text-base',
        xxl: 'h-15 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'xs',
    },
  },
);

type TagProps = ComponentProps<'span'> & VariantProps<typeof tagVariants>;

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    if (variant === 'android') children = 'Android';
    if (variant === 'ios') children = 'iOS';

    return (
      <span className={cn(tagVariants({ variant, size }), className)} ref={ref} {...props}>
        {children}
      </span>
    );
  }
);
Tag.displayName = 'Tag';
