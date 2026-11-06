"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Button-like links that play the press animation before navigating. */
export const PRESS_SELECTOR =
  ".poster-action, .sport-button, .footer-whatsapp, .legal-whatsapp, .consent-button, .cart-line-fix";
/** Matches the 180 ms press transition in globals.css. */
const PRESS_MS = 180;

/**
 * Delays navigation from button-like links until their press animation has
 * played. Modified clicks (new tab, etc.) and reduced-motion users navigate
 * immediately.
 */
export function PressNavigation() {
  const router = useRouter();
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || !link.matches(PRESS_SELECTOR)) return;
      if (link.hasAttribute("download") || link.dataset.pressing) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Runs in the capture phase, before Next.js <Link> handles the click;
      // <Link> skips navigation when the default was prevented.
      event.preventDefault();
      link.dataset.pressing = "true";
      link.classList.add("is-pressing");
      window.setTimeout(() => {
        link.classList.remove("is-pressing");
        delete link.dataset.pressing;
        // Read href now: some links update it in their own click handler.
        const url = new URL(link.href, window.location.href);
        if (link.target === "_blank") window.open(url.href, "_blank", "noopener,noreferrer");
        else if (url.origin === window.location.origin) router.push(url.pathname + url.search + url.hash);
        else window.location.assign(url.href);
      }, PRESS_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);
  return null;
}
