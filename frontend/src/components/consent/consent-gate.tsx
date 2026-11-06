"use client";
import type { ConsentCategory } from "@/lib/consent";
import { useConsent } from "./use-consent";

/**
 * Renders its children (for example a next/script analytics tag) only after
 * the visitor has accepted that category. Nothing renders on the server, so
 * no tracking code reaches the page before consent.
 *
 * <ConsentGate category="analytics"><Script src="…" /></ConsentGate>
 */
export function ConsentGate({
  category,
  children,
}: {
  category: ConsentCategory;
  children: React.ReactNode;
}) {
  const consent = useConsent();
  return consent?.[category] ? <>{children}</> : null;
}
