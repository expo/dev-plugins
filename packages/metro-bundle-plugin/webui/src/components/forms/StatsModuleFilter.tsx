import { type FormEvent, useState } from 'react';
// @ts-expect-error
import CloseIcon from 'lucide-react/dist/esm/icons/x';

import { useModuleFilterContext, useModuleFilterReducer } from '~/providers/modules';
import { Input } from '~/ui/Input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/ui/Sheet';
import { Label } from '~/ui/Label';
import { Checkbox } from '~/ui/Checkbox';

export function StatsModuleFilter() {
  const { filters, setFilters } = useModuleFilterContext();
  // NOTE(cedric): keep a duplicate data store to avoid spamming the API with every change
  const [formData, setFormData] = useModuleFilterReducer(filters);
  // NOTE(cedric): we want to programmatically close the dialog when the form is submitted, so make it controlled
  const [dialogOpen, setDialogOpen] = useState(false);

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    setDialogOpen(false);
    setFilters(formData);
  }

  function onDialogChange(isOpen: boolean) {
    setDialogOpen(isOpen);
    if (!isOpen) setFormData(filters);
  }

  return (
    <Sheet open={dialogOpen} onOpenChange={onDialogChange}>
      <SheetTrigger asChild>
        <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Filter
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter modules</SheetTitle>
          <SheetDescription>Filter the graph to show only the modules you want to see.</SheetDescription>
        </SheetHeader>

        <form onSubmit={onFormSubmit} className="border-default border-t my-4">
          <fieldset className="flex my-4 mt-8">
            <Label className="flex-1 whitespace-nowrap" htmlFor="filter-node_modules">
              Show <span className="font-bold">node_modules</span>
            </Label>
            <Checkbox
              id="filter-node_modules"
              checked={formData.types.includes('node_modules')}
              onCheckedChange={(isChecked) => {
                setFormData(
                  isChecked ? { types: ['project', 'node_modules'] } : { types: ['project'] }
                );
              }}
            />
          </fieldset>

          <fieldset className="py-4">
            <Label className="whitespace-nowrap" htmlFor="filter-include">
              File glob to include
            </Label>
            <Input
              id="filter-include"
              type="text"
              className="mt-2"
              placeholder="e.g. app/**/*.{ts}"
              value={formData.include}
              onChange={(event) => setFormData({ include: event.currentTarget.value })}
            />
          </fieldset>

          <fieldset className="py-4">
            <Label className="whitespace-nowrap" htmlFor="filter-exclude">
              File glob to exclude
            </Label>
            <Input
              id="filter-exclude"
              type="text"
              className="mt-2"
              placeholder="e.g. react-native/**"
              value={formData.exclude}
              onChange={(event) => setFormData({ exclude: event.currentTarget.value })}
            />
          </fieldset>

          <div className="mt-[25px] flex justify-end">
            <button
              type="submit"
              className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Apply filters
            </button>
          </div>

          <SheetClose asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close">
              <CloseIcon />
            </button>
          </SheetClose>
        </form>
      </SheetContent>
    </Sheet>
  );
}
