"use client";
import { useSyncExternalStore } from "react";
import { useCart } from "./cart";

/** True once the persisted cart has been read from localStorage. */
export function useCartHydrated() {
  return useSyncExternalStore(
    (onChange) => useCart.persist.onFinishHydration(onChange),
    () => useCart.persist.hasHydrated(),
    () => false,
  );
}
