import * as Select from '@radix-ui/react-select';
import cn from 'classnames';
// @ts-expect-error
import ChevronUpIcon from 'lucide-react/dist/esm/icons/chevron-up';
// @ts-expect-error
import ChevronDownIcon from 'lucide-react/dist/esm/icons/chevron-down';

import { useStatsEntryContext } from '~/providers/stats';
import { Button } from '~/ui/Button';
import { Tag } from '~/ui/Tag';

export function StatsEntrySelect() {
  const { entryId, setEntryId, entry, entries } = useStatsEntryContext();

  function onEntryChange(value: string) {
    setEntryId(Number(value));
  }

  return (
    <Select.Root value={String(entryId)} onValueChange={onEntryChange}>
      <Select.Trigger asChild>
        <Button variant="quaternary" size="sm">
          {!!entry && <Tag variant={entry?.platform} size="xs" className="mr-2" />}
          <Select.Value placeholder="Select bundle to inspect" />
          <Select.Icon className="text-icon-default">
            <ChevronDownIcon size={16} className="m-1 mr-0 align-middle" />
          </Select.Icon>
        </Button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          side="bottom"
          collisionPadding={{ left: 16, right: 16 }}
          className={cn(
            'flex min-w-[220px] flex-col gap-0.5 rounded-md border border-default bg-default p-1 shadow-md',
            // 'will-change-[opacity,transform]',
            // 'data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade'
          )}>
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            {entries?.data?.map((entry) => (
              <Select.Item key={entry.id} value={String(entry.id)} asChild>
                <Button variant="quaternary" size="sm" className="w-full">
                  <Tag variant={entry.platform} className="mr-2" />
                  <Select.ItemText>{entry.relativePath}</Select.ItemText>
                </Button>
              </Select.Item>
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
