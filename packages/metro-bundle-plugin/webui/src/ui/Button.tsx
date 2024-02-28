// see: https://ui.shadcn.com/docs/components/button

import cn from 'classnames';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // see: https://github.com/expo/styleguide/blob/251c92ac4558794903b83575fb97b4f03d00b1f8/packages/styleguide/src/components/Button/Button.tsx#L44
        primary: cn(
          'border-button-primary bg-button-primary text-button-primary shadow-xs',
          'hocus:bg-button-primary-hover active:scale-98',
          disabled('bg-button-primary-disabled border-button-primary-disabled text-button-primary-disabled'),
        ),
        secondary: cn(
          'border-button-secondary bg-button-secondary text-button-secondary shadow-xs',
          'hocus:bg-button-secondary-hover active:scale-98',
          disabled('bg-button-secondary-disabled border-button-secondary-disabled text-button-secondary-disabled'),
        ),
        tertiary: cn(
          'border-button-tertiary bg-button-tertiary text-button-tertiary shadow-none',
          'hocus:bg-button-tertiary-hover active:scale-98',
          disabled('bg-button-tertiary-disabled border-button-tertiary-disabled text-button-tertiary-disabled'),
        ),
        quaternary: cn(
          'border-button-quaternary bg-button-quaternary text-button-quaternary shadow-none',
          'hocus:bg-button-quaternary-hover active:scale-98',
          disabled('bg-button-quaternary-disabled border-button-quaternary-disabled text-button-quaternary-disabled'),
        ),
        destructive: cn(
          'border-button-primary-destructive bg-button-primary-destructive text-button-primary-destructive shadow-xs',
          'hocus:bg-button-primary-destructive-hover active:scale-98',
          disabled('bg-button-primary-destructive-disabled border-button-primary-destructive-disabled text-button-primary-destructive-disabled'),
        ),
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-8 px-3 text-3xs',
        sm: 'h-9 px-4 text-xs',
        md: 'h-10 px-4 text-xs',
        lg: 'h-11 px-6 text-base',
        xl: 'h-12 px-6 text-base',
        xxl: 'h-15 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

function prefix(prefix: string, styles: string[]) {
  return styles.map((style) => `${prefix}:${style}`).join(' ');
}

function disabled(styles: string) {
  return prefix('disabled', styles.split(' '));
}
