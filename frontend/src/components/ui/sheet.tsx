"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export const SheetTitle = Dialog.Title;
export const SheetDescription = Dialog.Description;
export function SheetContent({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60" />
      <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-[min(90vw,380px)] overflow-y-auto bg-white p-7 shadow-xl">
        <Dialog.Close
          className="absolute right-5 top-5 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full hover:bg-bone"
          aria-label="Cerrar menú"
        >
          <X />
        </Dialog.Close>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
