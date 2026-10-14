"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

export function FilterSelect({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="min-w-0">
      <span
        id={`${name}-label`}
        className="text-xs font-medium text-charcoal/75"
      >
        {label}
      </span>
      <Select.Root key={value} name={name} defaultValue={value || "all"}>
        <Select.Trigger
          aria-labelledby={`${name}-label`}
          className="filter-trigger group mt-2 flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-sand bg-cream px-4 text-left text-sm transition-colors hover:border-muted focus:outline-none focus:ring-2 focus:ring-petroleum/30 data-[state=open]:border-petroleum"
        >
          <Select.Value />
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
    </div>
  );
}
