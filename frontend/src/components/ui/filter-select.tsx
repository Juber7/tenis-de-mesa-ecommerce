"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

/** Dropdown with the store's filter styling (used by shop filters and forms). */
export function SelectMenu({
  name,
  value,
  defaultValue,
  onValueChange,
  options,
  placeholder,
  className,
  triggerProps,
}: {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  triggerProps?: React.ComponentProps<typeof Select.Trigger>;
}) {
  return (
    <Select.Root name={name} value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
      <Select.Trigger
        {...triggerProps}
        className={cn(
          "filter-trigger group flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-sand bg-cream px-4 text-left text-sm transition-colors hover:border-muted focus:outline-none focus:ring-2 focus:ring-petroleum/30 data-[state=open]:border-petroleum",
          className,
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown
            size={16}
            className="text-petroleum transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          collisionPadding={16}
          className="filter-options z-[70] max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-sand bg-cream p-1.5 text-charcoal shadow-xl shadow-ink/15"
        >
          <Select.ScrollUpButton className="flex justify-center py-1">
            <ChevronUp size={16} />
          </Select.ScrollUpButton>
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="relative flex min-h-11 cursor-pointer select-none items-center rounded-lg py-2 pl-9 pr-4 text-sm outline-none transition-colors data-[highlighted]:bg-sand/70 data-[state=checked]:bg-petroleum/10 data-[state=checked]:font-semibold data-[state=checked]:text-petroleum"
              >
                <Select.ItemIndicator className="absolute left-3">
                  <Check size={15} />
                </Select.ItemIndicator>
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex justify-center py-1">
            <ChevronDown size={16} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export function FilterSelect({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value: string;
  options: Option[];
}) {
  return (
    <div className="min-w-0">
      <span
        id={`${name}-label`}
        className="text-sm font-medium text-charcoal/75"
      >
        {label}
      </span>
      <SelectMenu
        key={value}
        name={name}
        defaultValue={value || "all"}
        options={options}
        className="mt-2"
        triggerProps={{ "aria-labelledby": `${name}-label` }}
      />
    </div>
  );
}
