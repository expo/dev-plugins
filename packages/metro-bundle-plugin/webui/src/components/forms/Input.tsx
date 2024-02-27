import cn from 'classnames';
import { HTMLProps } from 'react';

export function Input(props: HTMLProps<HTMLInputElement>) {
  const classes = cn(
    'text-[16px] leading-[1.625] tracking-[-0.011rem]',
    'relative w-full rounded-md border border-default bg-default p-3 text-default shadow-xs outline-0 transition-colors',
    'focus:border-palette-blue9',
    // error && '!border-danger',
    props.disabled && 'cursor-not-allowed opacity-60',
    props.className
  )

  return <input {...props} className={classes} />;
}
