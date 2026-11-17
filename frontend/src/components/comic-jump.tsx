"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { create } from "zustand";

type Jump = {
  /** Category listing that goes into the history before the product. */
  via: string;
  /** Product page the visitor asked for. */
  to: string;
};

/**
 * A panel of the home carousel opens its product through the product's
 * category: home → category → product. Going back from the product then shows
 * every product of that category instead of the home page.
 */
export const useComicJump = create<{
  active: Jump | null;
  start: (jump: Jump) => void;
  finish: () => void;
}>()((set) => ({
  active: null,
  start: (jump) => set((s) => (s.active ? s : { active: jump })),
  finish: () => set({ active: null }),
}));

/** If a page never arrives, stop the jump (and the loader that covers it). */
const GIVE_UP_MS = 8000;

/**
 * Runs the two navigations of a jump. PageLoader covers the screen with the
 * paddle loader meanwhile, so the category page never flashes on the way to
 * the product. Lives in the root layout because it must survive both
 * navigations.
 */
export function ComicJump() {
  const router = useRouter();
  const pathname = usePathname();
  const active = useComicJump((s) => s.active);
  const finish = useComicJump((s) => s.finish);

  useEffect(() => {
    if (!active) return;
    // The second navigation starts only after the first one is in the
    // history: Next.js drops a navigation that is still pending.
    if (pathname.startsWith("/producto/")) finish();
    else if (pathname === "/tienda") router.push(active.to);
    else router.push(active.via);
  }, [active, pathname, router, finish]);

  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(finish, GIVE_UP_MS);
    return () => window.clearTimeout(timer);
  }, [active, finish]);

  return null;
}
