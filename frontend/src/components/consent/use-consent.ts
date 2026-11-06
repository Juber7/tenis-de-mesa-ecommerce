"use client";
import { useSyncExternalStore } from "react";
import { readConsent, subscribeConsent } from "@/lib/consent";

const noop = () => () => {};

/** null until the visitor chooses; undefined during server rendering. */
export function useConsent() {
  const client = useSyncExternalStore(noop, () => true, () => false);
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  return client ? consent : undefined;
}
