"use client";
import { openConsentPreferences } from "@/lib/consent";

export function ConsentPreferencesButton({
  className,
  children = "Preferencias de cookies",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button type="button" className={className} onClick={openConsentPreferences}>
      {children}
    </button>
  );
}
