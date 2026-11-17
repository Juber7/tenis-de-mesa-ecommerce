"use client";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { create } from "zustand";
import { LoaderScreen } from "@/components/ui/loader-screen";
import { useComicJump } from "@/components/comic-jump";

/** Navigations faster than this never show the loader. */
const SHOW_AFTER_MS = 250;
/** Once shown, the loader stays long enough to be read as an animation. */
const MIN_VISIBLE_MS = 600;
/** If the page never arrives, stop covering the screen. */
const GIVE_UP_MS = 10_000;

const useLoader = create<{ visible: boolean; set: (visible: boolean) => void }>()((set) => ({
  visible: false,
  set: (visible) => set({ visible }),
}));

/**
 * Shows the paddle loader while a page is loading: after a click on an
 * internal link that takes a moment to arrive, and during the whole jump from
 * a carousel panel to its product (see ComicJump). Uses useSearchParams, so
 * the root layout renders it inside <Suspense>.
 */
export function PageLoader() {
  const here = `${usePathname()}?${useSearchParams()}`;
  const visible = useLoader((s) => s.visible);
  const setVisible = useLoader((s) => s.set);
  const jumping = useComicJump((s) => s.active !== null);
  const timers = useRef({ show: 0, giveUp: 0, shownAt: 0 });

  useEffect(() => {
    const t = timers.current;
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      const { origin, pathname, search } = window.location;
      // Other sites, API routes and links within the current page load nothing here.
      if (url.origin !== origin || url.pathname.startsWith("/api/")) return;
      if (url.pathname === pathname && url.search === search) return;
      window.clearTimeout(t.show);
      t.show = window.setTimeout(() => {
        t.shownAt = performance.now();
        setVisible(true);
        window.clearTimeout(t.giveUp);
        t.giveUp = window.setTimeout(() => setVisible(false), GIVE_UP_MS);
      }, SHOW_AFTER_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(t.show);
      window.clearTimeout(t.giveUp);
    };
  }, [setVisible]);

  // The address changed: the page arrived.
  useEffect(() => {
    const t = timers.current;
    window.clearTimeout(t.show);
    window.clearTimeout(t.giveUp);
    if (!useLoader.getState().visible) return;
    const hide = window.setTimeout(
      () => setVisible(false),
      Math.max(0, MIN_VISIBLE_MS - (performance.now() - t.shownAt)),
    );
    return () => window.clearTimeout(hide);
  }, [here, setVisible]);

  return <LoaderScreen visible={visible || jumping} />;
}
