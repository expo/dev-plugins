import * as Select from '@radix-ui/react-select';
import cn from 'classnames';
// @ts-expect-error
import ChevronUpIcon from 'lucide-react/dist/esm/icons/chevron-up';
// @ts-expect-error
import ChevronDownIcon from 'lucide-react/dist/esm/icons/chevron-down';

import { ComponentProps } from 'react';
import { useStatsEntryContext } from '~/providers/stats';

export function StatsEntrySelect() {
  const { entryId, setEntryId, entries } = useStatsEntryContext();

  function onEntryChange(value: string) {
    setEntryId(Number(value));
  }

  return (
    <Select.Root value={String(entryId)} onValueChange={onEntryChange}>
      <Select.Trigger
        className={cn(
          'relative z-40 flex cursor-pointer select-none items-center justify-between rounded-sm px-2 py-1 outline-0',
          'hocus:bg-hover'
        )}>
        <span className="color-palette-red12">
          <Select.Value placeholder="Select bundle to inspect" />
        </span>
        <Select.Icon className="text-icon-default">
          <ChevronDownIcon size={16} className="m-1 align-middle" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          side="bottom"
          collisionPadding={{ left: 16, right: 16 }}
          className={cn(
            'flex min-w-[220px] flex-col gap-0.5 rounded-md border border-default bg-default p-1 shadow-md',
            'will-change-[opacity,transform]',
            'data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade'
          )}>
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            {entries?.data?.map((entry) => (
              <StatsEntryItem key={entry.id} value={String(entry.id)}>
                {entry.name}
              </StatsEntryItem>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function StatsEntryItem({ children, ...props }: ComponentProps<typeof Select.Item>) {
  return (
    <Select.Item
      aria-disabled={props.disabled}
      className={cn(
        'relative z-40 flex cursor-pointer select-none items-center justify-between rounded-sm px-2 py-1 outline-0',
        'hocus:bg-hover',
        props.disabled && 'cursor-default opacity-60 hocus:bg-default'
      )}
      {...props}>
      <Select.ItemText asChild>
        <span className="font-normal text-default text-[13px] leading-[1.6154] tracking-[-0.003rem]">{children}</span>
      </Select.ItemText>
    </Select.Item>
  );
}
