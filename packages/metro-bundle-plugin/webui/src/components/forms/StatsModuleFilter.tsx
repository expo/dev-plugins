import * as Dialog from '@radix-ui/react-dialog';
import { useMemo, type FormEvent, useState } from 'react';
// @ts-expect-error
import CloseIcon from 'lucide-react/dist/esm/icons/x';

import { useModuleFilterContext } from '~/providers/modules';
import { Input } from '~/components/forms/Input';

export function StatsModuleFilter() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { filters, setFilters } = useModuleFilterContext();
  const [nodeModules, setNodeModules] = useState(filters.types.includes('node_modules'));
  const [includePattern, setIncludePattern] = useState(filters.include);
  const [excludePattern, setExcludePattern] = useState(filters.exclude);

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
  
    setDialogOpen(false);
    setFilters({
      types: nodeModules ? ['project', 'node_modules'] : ['project'],
      include: includePattern,
      exclude: excludePattern,
    });
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger asChild>
        <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Filter
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" /> */}
        <Dialog.Content className="bg-overlay data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Filter modules
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Filter the tree to show only the modules you want to see.
          </Dialog.Description>

          <form onSubmit={onFormSubmit}>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label className="whitespace-nowrap" htmlFor="filter-node_modules">
                Show <span className="font-bold">node_modules</span>
              </label>
              <Input
                id="filter-node_modules"
                type="checkbox"
                checked={nodeModules}
                onChange={(event) => setNodeModules(event.currentTarget.checked)}
              />
            </fieldset>

            <fieldset className="mb-[15px] flex items-center gap-5">
              <label className="whitespace-nowrap" htmlFor="filter-include">
                File glob to include
              </label>
              <Input
                id="filter-include"
                type="text"
                className="flex-1"
                placeholder="e.g. app/**/*.{ts}"
                value={includePattern}
                onChange={(event) => setIncludePattern(event.currentTarget.value)}
              />
            </fieldset>

            <fieldset className="mb-[15px] flex items-center gap-5">
              <label className="whitespace-nowrap" htmlFor="filter-exclude">
                File glob to exclude
              </label>
              <Input
                id="filter-exclude"
                type="text"
                className="flex-1"
                placeholder="e.g. react-native/**"
                value={excludePattern}
                onChange={(event) => setExcludePattern(event.currentTarget.value)}
              />
            </fieldset>

            <div className="mt-[25px] flex justify-end">
              <button
                type="submit"
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Apply filters
              </button>
            </div>

            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close">
                <CloseIcon />
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
