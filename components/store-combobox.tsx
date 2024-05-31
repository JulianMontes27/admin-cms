"use client";

import {
  Check,
  PlusSquare,
  ChevronsUpDown,
  Store as StoreIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { CommandSeparator } from "cmdk";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface StoreComboboxProps extends PopoverTriggerProps {
  items: Store[];
}

export function StoreCombobox({ items = [] }: StoreComboboxProps) {
  const params = useParams();
  const router = useRouter();
  const storeModal = useStoreModal();

  //format the Items<Store> to only use the name prop and id
  const routes = items.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  //get the currently active store with the params
  const currentActiveStore = routes.find(
    (store) => store.value === params.storeId
  );
  const [open, setOpen] = useState(false);

  const handleSelectStore = (store: { label: string; value: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className="max-w-[200px] justify-between border-none flex "
        >
          <StoreIcon size={20} />
          {currentActiveStore && <p>{currentActiveStore.label}</p>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[230px] p-0 border">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search a store..." />
            <CommandEmpty>No stores found.</CommandEmpty>

            <CommandGroup heading="Your Stores">
              {routes.map((route) => (
                <CommandItem
                  key={route.value}
                  onSelect={() => handleSelectStore(route)}
                  className={
                    (cn("text-sm"),
                    currentActiveStore?.label === route.label
                      ? "font-bold"
                      : "")
                  }
                >
                  {route.label}
                  {currentActiveStore?.label === route.label && (
                    <div className="ml-auto">
                      <Check />
                    </div>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="font-bold flex gap-2 cursor-pointer"
                onSelect={() => {
                  //activate the create-store modal
                  storeModal.onOpen();
                }}
              >
                <PlusSquare />
                Create new store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
